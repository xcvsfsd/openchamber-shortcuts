// Work Status 快捷区：命令 + 片段，显示描述点即发。来源同面板。
// 标题栏放「↻」（重读片段/命令配置），老宿主不支持时退回区内按钮。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import { loadShortcuts, fire, colorFor, sortByLabel } from '../shared/shortcuts.ts';

const host = connectHost();

// 标题栏控件回调必须同步注册，处理函数用声明式定义在后面
host.onStatusControl((e) => {
  if (e.id === 'refresh') void refreshNow();
});

const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

root.innerHTML = `<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0)}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6}
button:disabled{opacity:.5}
button[hidden]{display:none}
.ref{padding:2px 8px;font-size:12px;font-weight:400;background:var(--oc-elevated,inherit)}
.mut{font-size:12px;opacity:.7}
.t{white-space:normal;word-break:break-all;font-size:11px;opacity:.75;font-variant-numeric:tabular-nums}
.res{white-space:normal;word-break:break-all;font-size:11px;opacity:.75}
.res.bad{color:#f87171;opacity:1}
</style>
<div class="grid" id="g"></div>
<div class="grid"><button class="ref" id="b-refresh" title="重读片段与命令配置" hidden>↻ 重读配置</button></div>
<div class="t" id="t"></div>
<div class="res" id="out"></div>`;

const g = document.querySelector('#g') as HTMLElement;
const out = document.querySelector('#out') as HTMLElement;
const tEl = document.querySelector('#t') as HTMLElement;
const bRefresh = document.querySelector('#b-refresh') as HTMLButtonElement;

let lastSig = '';
let curDir: string | null = null;
let hasSession = false;
let headerControls = false;

const now = (): string => new Date().toTimeString().slice(0, 8);

const say = (text: string, bad = false): void => {
  out.textContent = text;
  out.title = text;
  out.classList.toggle('bad', bad);
  fit();
};

const fit = (): void => {
  const h = Math.ceil(root.getBoundingClientRect().height);
  void host.setHeight(h).catch(() => undefined);
};

// 标题栏「↻」；不支持的宿主退回区内按钮
const publishControls = async (): Promise<void> => {
  try {
    await host.setStatusControls([{ kind: 'button', id: 'refresh', label: '↻' }]);
    headerControls = true;
    bRefresh.hidden = true;
  } catch {
    headerControls = false;
    bRefresh.hidden = false;
  }
};

const paint = async (dir: string | null, force = false): Promise<void> => {
  const data = await loadShortcuts(host, dir);
  const sig = JSON.stringify([data.snippets, data.commands]);
  if (!force && sig === lastSig) return;
  lastSig = sig;
  const { snippets, commands } = data;
  g.innerHTML = '';
  for (const sc of sortByLabel([...commands, ...snippets])) {
    const b = document.createElement('button');
    const c = colorFor(sc.label);
    b.style.borderColor = c;
    b.style.background = `color-mix(in srgb, ${c} 16%, transparent)`;
    b.textContent = sc.label;
    b.title = sc.text.length > 200 ? sc.text.slice(0, 200) : sc.text;
    b.onclick = () => void fire(host, sc.text, (t) => say(t), hasSession);
    g.appendChild(b);
  }
  if (g.children.length === 0) g.innerHTML = '<span class="mut">暂无快捷</span>';
  tEl.textContent = `上次刷新 ${now()}`;
  fit();
};

// 重读配置：强制重绘，给回执，标题栏与区内按钮共用
async function refreshNow(): Promise<void> {
  if (bRefresh.disabled) return;
  bRefresh.disabled = true;
  say('重读配置…');
  try {
    await paint(curDir, true);
    const n = g.children.length;
    say(`已重读：${n === 1 && g.querySelector('.mut') ? 0 : n} 个快捷`);
  } catch (e) {
    say(`重读失败：${(e as Error).message?.slice(0, 40) ?? '未知错误'}`, true);
  } finally {
    bRefresh.disabled = false;
    fit();
  }
}

bRefresh.onclick = () => void refreshNow();

new ResizeObserver(() => fit()).observe(root);

setInterval(() => { if (!document.hidden) void paint(curDir); }, 30000);

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  curDir = ctx.directory ?? null;
  hasSession = !!ctx.session;
  // 新宿主把「↻」放到分区标题栏；老宿主保留区内按钮
  if (ctx.features?.statusControls === true) void publishControls();
  else bRefresh.hidden = false;
  void paint(curDir);
});

// 切项目后宿主会清空标题栏控件，重新发布一次
host.onDirectory((next) => {
  curDir = next;
  if (headerControls) void publishControls();
  void paint(curDir);
});
