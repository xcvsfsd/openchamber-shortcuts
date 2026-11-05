// 快捷来源（只读不管理）：
// 1. opencode 片段库 ~/.config/opencode/snippet/*.md —— 按钮发正文，显示 description
// 2. opencode 自定义命令（全局 snippet 同级 command/commands + 项目下 command/commands/.opencode/*）—— 显示 description，发 /name
// 3. OpenChamber 本仓 .openchamber/project.json draftStarters —— description 能解析到就显示否则显示名发 /name
import { HostRequestError, type HostClient } from '@openchamber/sdk';

export type Shortcut = { label: string; text: string };

// frontmatter 取 description，没有返回 null
const frontDescription = (content: string): string | null => {
  const m = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!m) return null;
  const d = m[1].split('\n').find((l) => /^\s*description\s*:/.test(l));
  if (!d) return null;
  return d.replace(/^\s*description\s*:\s*/, '').replace(/^["']|["']$/g, '').trim() || null;
};

// 去 frontmatter 取正文
const bodyOf = (content: string): string => content.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '').trim();

const listMd = async (host: HostClient, dir: string): Promise<string[]> => {
  try {
    const { entries } = await host.listDir(dir);
    return entries.filter((e) => e.kind === 'file' && e.name.endsWith('.md')).map((e) => e.name);
  } catch {
    return [];
  }
};

const readText = async (host: HostClient, path: string): Promise<string | null> => {
  try {
    const { content } = await host.readFile(path);
    return content;
  } catch {
    return null;
  }
};

export type ShortcutData = {
  snippets: Shortcut[];
  commands: Shortcut[];
  hint: string;
};

export const loadShortcuts = async (host: HostClient, projectDir: string | null): Promise<ShortcutData> => {
  const snippets: Shortcut[] = [];
  const commands: Shortcut[] = [];
  const seen = new Set<string>();
  const descByName = new Map<string, string>();

  // 1. 片段库：发正文
  const SNIP = '~/.config/opencode/snippet';
  for (const f of await listMd(host, SNIP)) {
    const c = await readText(host, `${SNIP}/${f}`);
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
  const cmdDirs = projectDir
    ? [SNIP.replace('snippet', 'command'), SNIP.replace('snippet', 'commands'), 'command', 'commands', '.opencode/command', '.opencode/commands']
    : [SNIP.replace('snippet', 'command'), SNIP.replace('snippet', 'commands')];
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

  // 3. OpenChamber 本仓 draftStarters：description 能对上就显示否则显示名
  if (projectDir) {
    try {
      const { content } = await host.readFile('.openchamber/project.json');
      const cfg = JSON.parse(content) as { draftStarters?: { type?: string; name?: string }[] };
      if (Array.isArray(cfg.draftStarters)) {
        for (const s of cfg.draftStarters.slice(0, 30)) {
          if (typeof s?.name !== 'string' || !s.name) continue;
          const key = `cmd:/${s.name}`;
          if (seen.has(key)) continue;
          seen.add(key);
          commands.unshift({ label: descByName.get(s.name) ?? s.name, text: `/${s.name}` });
        }
      }
    } catch { /* 无文件照常用上面两类 */ }
  }

  const hint = snippets.length + commands.length === 0
    ? '无可用快捷：片段放 ~/.config/opencode/snippet/*.md命令放 command/ 或本仓 draftStarters'
    : '来自 opencode 片段/命令与本仓 draftStarters去各自位置管理';
  return { snippets, commands, hint };
};

// 一键提交：直接发；无会话/忙则填入输入框
export const fire = async (host: HostClient, text: string, say: (t: string) => void): Promise<void> => {
  try {
    const r = await host.prompt({ text, send: true });
    say(r.sent === 'sent' ? '已提交到会话' : `未直接发出（${r.sent}），已填入输入框`);
    if (r.sent !== 'sent') await host.prompt({ text }).catch(() => undefined);
  } catch (e) {
    if (e instanceof HostRequestError && (e.code === 'NO_SESSION' || e.code === 'SESSION_BUSY')) {
      say(e.code === 'NO_SESSION' ? '无会话已填入输入框' : '会话忙已填入输入框稍后发送');
      await host.prompt({ text }).catch(() => undefined);
    } else {
      say(e instanceof HostRequestError ? `${e.code}` : '发送失败');
    }
  }
};
