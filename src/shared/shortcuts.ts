// 快捷按钮共享逻辑：预置 + 存储 + 一键提交，面板与 Work Status 共用。
import { HostRequestError, type HostClient } from '@openchamber/sdk';

export type Shortcut = { label: string; text: string };

export const PRESETS: Shortcut[] = [
  { label: '/news', text: '/news' },
  { label: '/ci', text: '/ci' },
  { label: '/cd', text: '/cd' },
  { label: '/tag', text: '/tag' },
];

export const loadCustom = async (host: HostClient): Promise<Shortcut[]> => {
  try {
    const v = await host.storage.get('shortcuts');
    if (Array.isArray(v)) {
      return (v as unknown[]).filter(
        (x): x is Shortcut =>
          typeof x === 'object' && x !== null &&
          typeof (x as Shortcut).label === 'string' && typeof (x as Shortcut).text === 'string',
      ).slice(0, 30);
    }
  } catch { /* 无存储照常用预置 */ }
  return [];
};

export const saveCustom = (host: HostClient, list: Shortcut[]): void => {
  void host.storage.set('shortcuts', JSON.parse(JSON.stringify(list))).catch(() => undefined);
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
