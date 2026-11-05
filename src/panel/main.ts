// 快捷命令面板：按钮来自 OpenChamber 配置（.openchamber/project.json draftStarters），插件只读不管理。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import { COMPARE_SNIPPET, loadShortcuts, fire, type Shortcut } from '../shared/shortcuts.ts';

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
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6;font-weight:700}
button:disabled{opacity:.5}
.mut{font-size:13px;opacity:.7}
</style>
<h3>快捷命令</h3>
<div class="grid" id="cmds"></div>
<h3>代码片段</h3>
<div class="grid" id="snips"></div>
<div class="mut" id="out">点按钮直接发到当前会话</div>
<div class="mut" id="src"></div>
`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const cmdsEl = $('cmds');
const snipsEl = $('snips');
const outEl = $('out');
const srcEl = $('src');
const say = (t: string): void => { outEl.textContent = t; };

const mkButton = (sc: Shortcut, cls: string): HTMLButtonElement => {
  const b = document.createElement('button');
  b.className = cls;
  b.textContent = sc.label;
  b.title = sc.text;
  b.onclick = () => void fire(host, sc.text, say);
  return b;
};

const paint = async (dir: string | null): Promise<void> => {
  const { list, fromConfig } = await loadShortcuts(host, dir);
  cmdsEl.innerHTML = '';
  for (const sc of list) cmdsEl.appendChild(mkButton(sc, 'cmd'));
  snipsEl.innerHTML = '';
  snipsEl.appendChild(mkButton(COMPARE_SNIPPET, 'snip'));
  srcEl.textContent = fromConfig
    ? '来自本仓 .openchamber/project.json draftStarters，去设置→项目→起草器管理'
    : '本仓无 draftStarters显示兜底去设置→项目→起草器添加（可移入仓库）';
};

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  void paint(ctx.directory ?? null);
});
