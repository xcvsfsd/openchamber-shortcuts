// 快捷按钮唯一来源：OpenChamber 配置（仓库 .openchamber/project.json 的 draftStarters）。
// 插件只读不管理：去 设置→项目→起草器 里增删（可移入仓库），改完自动生效。
// 另附一个内置代码片段：分支⇄Tag 对比。
import { HostRequestError, type HostClient } from '@openchamber/sdk';

export type Shortcut = { label: string; text: string; dialog?: 'compare' };

type DraftStarter = { type?: string; name?: string };

// 缺配置时的兜底，保证开箱可用
const FALLBACK: Shortcut[] = [
  { label: '/news', text: '/news' },
  { label: '/ci', text: '/ci' },
  { label: '/cd', text: '/cd' },
  { label: '/tag', text: '/tag' },
];

// 内置代码片段：对比分支与 tag（不是 /ci）
export const COMPARE_SNIPPET: Shortcut = {
  label: '分支⇄Tag对比',
  text: '',
  dialog: 'compare',
};

export const loadShortcuts = async (host: HostClient, dir: string | null): Promise<{ list: Shortcut[]; fromConfig: boolean }> => {
  if (dir) {
    try {
      const { content } = await host.readFile('.openchamber/project.json');
      const cfg = JSON.parse(content) as { draftStarters?: DraftStarter[] };
      if (Array.isArray(cfg.draftStarters) && cfg.draftStarters.length > 0) {
        const list = cfg.draftStarters
          .filter((s) => typeof s?.name === 'string' && s.name.length > 0)
          .slice(0, 30)
          .map((s) => ({ label: `/${s.name as string}`, text: `/${s.name as string}` }));
        if (list.length > 0) return { list, fromConfig: true };
      }
    } catch { /* 无文件/无权限/格式不对都走兜底 */ }
  }
  return { list: FALLBACK, fromConfig: false };
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
