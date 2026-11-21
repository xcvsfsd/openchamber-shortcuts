// 快捷来源（只读不管理）：
// 1. opencode 片段库 ~/.config/opencode/snippet/*.md —— 按钮发正文，显示 description
// 2. opencode 自定义命令（全局 command/commands + 项目下 command/commands/.opencode/*）—— 显示 description，发 /name
// 3. 本仓 .openchamber/project.json 的 draftStarters —— description 能对上就显示，否则显示名，发 /name
import { HostRequestError, type HostClient } from '@openchamber/sdk';

export type Shortcut = { label: string; text: string };

export type ShortcutData = {
  snippets: Shortcut[];
  commands: Shortcut[];
  hint: string;
};

// —— 路径常量：全局片段一处，命令分全局 + 项目两组 ——
const GLOBAL_SNIPPET_DIR = '~/.config/opencode/snippet';
const GLOBAL_COMMAND_DIRS = [
  '~/.config/opencode/command',
  '~/.config/opencode/commands',
] as const;
const PROJECT_COMMAND_DIRS = [
  'command',
  'commands',
  '.opencode/command',
  '.opencode/commands',
] as const;
const DRAFT_STARTERS_PATH = '.openchamber/project.json';
const MAX_DRAFT_STARTERS = 30;

// 不同按钮不同色：按名 FNV-1a 取色，深浅主题都可读
const PALETTE = ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];
export const colorFor = (label: string): string => {
  let h = 0x811c9dc5;
  const bytes = new TextEncoder().encode(label);
  for (const b of bytes) {
    h ^= b;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return PALETTE[h % PALETTE.length] as string;
};

// 按显示名（描述）字符串排序，数字感知（如 0/1/2/10/11）
export const sortByLabel = (list: Shortcut[]): Shortcut[] =>
  [...list].sort((a, b) => a.label.localeCompare(b.label, 'zh-CN', { numeric: true }));

// frontmatter 取 description，没有返回 null
const frontDescription = (content: string): string | null => {
  const m = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const line = m[1].split('\n').find((l) => /^\s*description\s*:/.test(l));
  if (!line) return null;
  return line.replace(/^\s*description\s*:\s*/, '').replace(/^["']|["']$/g, '').trim() || null;
};

// 去 frontmatter 取正文
const bodyOf = (content: string): string =>
  content.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*\r?\n?/, '').trim();

// 列目录下 .md 文件名，读不到返回空（目录不存在时走提示分支）
const listMd = async (host: HostClient, dir: string): Promise<string[]> => {
  try {
    const { entries } = await host.listDir(dir);
    return entries.filter((e) => e.kind === 'file' && e.name.endsWith('.md')).map((e) => e.name);
  } catch {
    return [];
  }
};

// 读文本文件，读不到返回 null
const readText = async (host: HostClient, path: string): Promise<string | null> => {
  try {
    const { content } = await host.readFile(path);
    return content;
  } catch {
    return null;
  }
};

export const loadShortcuts = async (host: HostClient, projectDir: string | null): Promise<ShortcutData> => {
  const snippets: Shortcut[] = [];
  const commands: Shortcut[] = [];
  const seen = new Set<string>();
  // 文件名 → 显示名：给 draftStarters 反查描述用
  const descByName = new Map<string, string>();

  // 1. 片段库：发正文
  for (const f of await listMd(host, GLOBAL_SNIPPET_DIR)) {
    const c = await readText(host, `${GLOBAL_SNIPPET_DIR}/${f}`);
    if (c === null) continue;
    const body = bodyOf(c);
    if (!body) continue;
    const name = f.replace(/\.md$/, '');
    const label = frontDescription(c) ?? name;
    const key = `snip:${body}`;
    if (seen.has(key)) continue;
    seen.add(key);
    snippets.push({ label, text: body });
    descByName.set(name, label);
  }

  // 2. opencode 命令：全局 + 项目，显示 description，发 /name
  const cmdDirs = projectDir ? [...GLOBAL_COMMAND_DIRS, ...PROJECT_COMMAND_DIRS] : [...GLOBAL_COMMAND_DIRS];
  for (const d of cmdDirs) {
    for (const f of await listMd(host, d)) {
      const c = await readText(host, `${d}/${f}`);
      if (c === null) continue;
      const name = f.replace(/\.md$/, '');
      const label = frontDescription(c) ?? name;
      descByName.set(name, label);
      const key = `cmd:/${name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      commands.push({ label, text: `/${name}` });
    }
  }

  // 3. 本仓 draftStarters：description 能对上就显示，否则显示名（置顶后统一排序）
  if (projectDir) {
    try {
      const { content } = await host.readFile(DRAFT_STARTERS_PATH);
      const cfg = JSON.parse(content) as { draftStarters?: { type?: string; name?: string }[] };
      if (Array.isArray(cfg.draftStarters)) {
        for (const s of cfg.draftStarters.slice(0, MAX_DRAFT_STARTERS)) {
          if (typeof s?.name !== 'string' || !s.name) continue;
          const key = `cmd:/${s.name}`;
          if (seen.has(key)) continue;
          seen.add(key);
          commands.unshift({ label: descByName.get(s.name) ?? s.name, text: `/${s.name}` });
        }
      }
    } catch { /* 无文件照常用上面两类 */ }
  }

  const sorted = {
    snippets: sortByLabel(snippets),
    commands: sortByLabel(commands),
  };
  const total = sorted.snippets.length + sorted.commands.length;
  const hint = total === 0
    ? '无可用快捷：片段放 ~/.config/opencode/snippet/*.md，命令放 command/ 或本仓 draftStarters'
    : '来自 opencode 片段/命令与本仓 draftStarters，去各自位置管理';
  return { ...sorted, hint };
};

// 一键提交到当前会话；无会话只提示不建（建会话走不通已移除）
// autoSend=true：send:true 自动发送；false：只填入输入框不发送（底部开关控制）
export const fire = async (
  host: HostClient,
  text: string,
  say: (t: string) => void,
  hasSession?: boolean,
  autoSend = true,
): Promise<void> => {
  if (hasSession === false) {
    say('先打开或新建一个会话再点');
    return;
  }
  // 关：只填入输入框，不自动发送
  if (!autoSend) {
    try {
      await host.prompt({ text });
      say('已填入输入框，未自动发送');
    } catch (e) {
      say(isNoSession(e) ? '先打开或新建一个会话再点' : `请求失败：${codeOf(e)}`);
    }
    return;
  }
  // 开：先尝试自动发送，失败回退为填入
  try {
    const r = await host.prompt({ text, send: true });
    if (r.sent === 'sent') {
      say('已提交到会话');
      return;
    }
    say(`未直接发出（${r.sent}），已填入输入框`);
    await host.prompt({ text }).catch(() => undefined);
  } catch (e) {
    if (!isHostError(e)) {
      say(String(e));
      return;
    }
    if (e.code === 'NO_SESSION') {
      say('先打开或新建一个会话再点');
      return;
    }
    if (e.code === 'SESSION_BUSY') {
      say('会话忙已填入输入框稍后发送');
      await host.prompt({ text }).catch(() => undefined);
      return;
    }
    say(`${e.code}`);
  }
};

// —— 错误归一：宿主错误取 code，其余取原文 ——
const isHostError = (e: unknown): e is HostRequestError => e instanceof HostRequestError;
const isNoSession = (e: unknown): boolean => isHostError(e) && e.code === 'NO_SESSION';
const codeOf = (e: unknown): string => ((e as { code?: string }).code ?? e) as string;
