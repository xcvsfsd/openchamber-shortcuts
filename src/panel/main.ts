// 快捷命令面板：预置 + 自加按钮一键提交到当前会话。
// 同一份逻辑也在 Work Status 快捷区（status），见 shared/shortcuts.ts。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import { PRESETS, loadCustom, saveCustom, fire, type Shortcut } from '../shared/shortcuts.ts';

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
const say = (t: string): void => { outEl.textContent = t; };

const mkButton = (sc: Shortcut): HTMLButtonElement => {
  const b = document.createElement('button');
  b.className = 'cmd';
  b.textContent = sc.label;
  b.title = sc.text;
  b.onclick = () => void fire(host, sc.text, say);
  return b;
};

const renderCustom = (list: Shortcut[]): void => {
  customEl.innerHTML = '';
  if (list.length === 0) {
    customEl.innerHTML = '<span class="mut">暂无下面加一个</span>';
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
      saveCustom(host, next);
      void refresh();
    };
    wrap.appendChild(del);
    customEl.appendChild(wrap);
  }
};

const refresh = async (): Promise<void> => {
  presetEl.innerHTML = '';
  for (const sc of PRESETS) presetEl.appendChild(mkButton(sc));
  renderCustom(await loadCustom(host));
};

$('btn-add').onclick = () => {
  const label = ($('new-label') as unknown as HTMLInputElement).value.trim().slice(0, 20);
  const text = ($('new-text') as unknown as HTMLInputElement).value.trim().slice(0, 500);
  if (!label || !text) { say('名称和内容都要填'); return; }
  loadCustom(host).then((list) => {
    if (list.length >= 30) { say('最多 30 个'); return; }
    const next = [...list, { label, text }];
    saveCustom(host, next);
    ($('new-label') as unknown as HTMLInputElement).value = '';
    ($('new-text') as unknown as HTMLInputElement).value = '';
    void refresh();
  }).catch(() => { say('添加失败'); });
};

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  void refresh();
});
