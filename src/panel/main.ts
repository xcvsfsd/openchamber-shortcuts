// 快捷命令面板：按钮来自三处配置（片段库/opencode命令/本仓draftStarters），显示描述，插件只读不管理。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import { loadShortcuts, fire, colorFor, type Shortcut } from '../shared/shortcuts.ts';

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
<div class="row"><h3 style="flex:1">命令</h3><button id="btn-refresh" title="重读配置">↻</button></div>
<div class="grid" id="cmds"></div>
<h3>代码片段</h3>
<div class="grid" id="snips"></div>
<div class="mut" id="out">点按钮直接发到当前会话</div>
<div class="mut" id="src"></div>
<div class="mut" style="font-size:11px;opacity:.5">panel v0.1.0-sessions直发</div>
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
  const c = colorFor(sc.label);
  b.style.borderColor = c;
  b.style.background = `color-mix(in srgb, ${c} 16%, transparent)`;
  b.textContent = sc.label;
  b.title = sc.text.length > 200 ? sc.text.slice(0, 200) : sc.text;
  b.onclick = () => void fire(host, sc.label, sc.text, say);
  return b;
};

let lastSig = '';
let curDir: string | null = null;
const paint = async (dir: string | null, force = false): Promise<void> => {
  const data = await loadShortcuts(host, dir);
  const sig = JSON.stringify([data.snippets, data.commands]);
  if (!force && sig === lastSig) return;
  lastSig = sig;
  const { snippets, commands, hint } = data;
  cmdsEl.innerHTML = '';
  for (const sc of commands) cmdsEl.appendChild(mkButton(sc, 'cmd'));
  if (commands.length === 0) cmdsEl.innerHTML = '<span class="mut">暂无</span>';
  snipsEl.innerHTML = '';
  for (const sc of snippets) snipsEl.appendChild(mkButton(sc, 'snip'));
  if (snippets.length === 0) snipsEl.innerHTML = '<span class="mut">暂无</span>';
  srcEl.textContent = hint;
};

$('btn-refresh').onclick = () => void paint(curDir, true);

// 配置改完 30 秒内自动刷；切回可见立刻刷
setInterval(() => { if (!document.hidden) void paint(curDir); }, 30000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) void paint(curDir);
});

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  curDir = ctx.directory ?? null;
  void paint(curDir, true);
});
