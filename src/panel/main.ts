// 快捷命令面板：预置 /news /ci /cd /tag + 自加按钮，一键提交到当前会话。
// 点按钮 = host.prompt({ send: true }) 直接发；无会话/忙时回落填入输入框。
import { connectHost, HostRequestError, type JsonValue } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

root.innerHTML = `
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:14px/1.6 system-ui,sans-serif}
#root{padding:10px;display:flex;flex-direction:column;gap:10px;min-height:100%;max-width:100%;overflow-x:hidden}
h3{margin:4px 0 0;font-size:13px;opacity:.65;font-weight:600}
.grid{display:flex;flex-wrap:wrap;gap:8px}
button{padding:8px 14px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0);font-weight:700}
button:disabled{opacity:.5}
button.danger{padding:4px 8px;font-size:12px}
.row{display:flex;gap:8px;align-items:center}
input{flex:1;min-width:0;padding:7px 9px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit)}
.mut{font-size:13px;opacity:.7}
.err{font-size:13px;color:var(--error,#d33)}
</style>
<h3>常用命令</h3>
<div class="grid" id="preset"></div>
<h3>我的快捷</h3>
<div class="grid" id="custom"></div>
<div class="row">
  <input id="new-label" placeholder="名称，如 发版检查" maxlength="20" />
  <input id="new-text" placeholder="发送内容，如 /ci" maxlength="500" />
  <button id="btn-add" title="添加快捷按钮">＋</button>
</div>
<div class="mut" id="out">点按钮直接发到当前会话</div>
`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const presetEl = $('preset');
const customEl = $('custom');
const outEl = $('out');

type Shortcut = { label: string; text: string };
const PRESETS: Shortcut[] = [
  { label: '/news', text: '/news' },
  { label: '/ci', text: '/ci' },
  { label: '/cd', text: '/cd' },
  { label: '/tag', text: '/tag' },
];

const loadCustom = async (): Promise<Shortcut[]> => {
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
const saveCustom = (list: Shortcut[]): void => {
  void host.storage.set('shortcuts', JSON.parse(JSON.stringify(list)) as JsonValue).catch(() => undefined);
};

// 一键提交：直接发；无会话/忙则填入输入框让用户手点发送
const fire = async (text: string): Promise<void> => {
  try {
    const r = await host.prompt({ text, send: true });
    outEl.textContent = r.sent === 'sent' ? '已提交到会话' : `未直接发出（${r.sent}），已填入输入框`;
    if (r.sent !== 'sent') await host.prompt({ text }).catch(() => undefined);
  } catch (e) {
    if (e instanceof HostRequestError && (e.code === 'NO_SESSION' || e.code === 'SESSION_BUSY')) {
      outEl.textContent = e.code === 'NO_SESSION' ? '无会话，已填入输入框' : '会话忙已填入输入框稍后发送';
      await host.prompt({ text }).catch(() => undefined);
    } else {
      outEl.textContent = e instanceof HostRequestError ? `${e.code}` : '发送失败';
    }
  }
};

const mkButton = (sc: Shortcut): HTMLButtonElement => {
  const b = document.createElement('button');
  b.className = 'cmd';
  b.textContent = sc.label;
  b.title = sc.text;
  b.onclick = () => void fire(sc.text);
  return b;
};

const renderCustom = (list: Shortcut[]): void => {
  customEl.innerHTML = '';
  if (list.length === 0) {
    customEl.innerHTML = '<span class="mut">暂无，下面加一个</span>';
    return;
  }
  for (const sc of list) {
    const wrap = document.createElement('span');
    wrap.className = 'row';
    wrap.appendChild(mkButton(sc));
    const del = document.createElement('button');
    del.className = 'danger';
    del.textContent = '✕';
    del.title = `删除 ${sc.label}`;
    del.onclick = () => {
      const next = list.filter((x) => x !== sc);
      saveCustom(next);
      void refresh();
    };
    wrap.appendChild(del);
    customEl.appendChild(wrap);
  }
};

const refresh = async (): Promise<void> => {
  presetEl.innerHTML = '';
  for (const sc of PRESETS) presetEl.appendChild(mkButton(sc));
  renderCustom(await loadCustom());
};

$('btn-add').onclick = () => {
  const label = ($('new-label') as unknown as HTMLInputElement).value.trim().slice(0, 20);
  const text = ($('new-text') as unknown as HTMLInputElement).value.trim().slice(0, 500);
  if (!label || !text) { outEl.textContent = '名称和内容都要填'; return; }
  loadCustom().then((list) => {
    if (list.length >= 30) { outEl.textContent = '最多 30 个'; return; }
    const next = [...list, { label, text }];
    saveCustom(next);
    ($('new-label') as unknown as HTMLInputElement).value = '';
    ($('new-text') as unknown as HTMLInputElement).value = '';
    void refresh();
  }).catch(() => { outEl.textContent = '添加失败'; });
};

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  void refresh();
});
