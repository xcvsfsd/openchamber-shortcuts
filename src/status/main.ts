// Work Status 快捷区：命令 + 片段，点即提交，底部胶囊开关控制是否自动发送。
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
.bar{display:flex;align-items:center;gap:8px}
.cap{display:inline-flex;align-items:center;gap:8px;font-size:12px;opacity:.9;user-select:none}
.pill{position:relative;width:38px;height:20px;padding:0;border-radius:999px;border:1px solid var(--oc-border,#8888);background:color-mix(in srgb,currentColor 12%,transparent);cursor:pointer}
.pill .knob{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:currentColor;opacity:.55;transition:left .15s,opacity .15s}
.pill.on{border-color:var(--primary,#3574f0)}
.pill.on .knob{left:20px;background:var(--primary,#3574f0);opacity:1}
.ref{padding:2px 8px;font-size:12px;font-weight:400;background:var(--oc-elevated,inherit)}
.mut{font-size:12px;opacity:.7}
.t{white-space:normal;word-break:break-all;font-size:11px;opacity:.75;font-variant-numeric:tabular-nums}
.res{white-space:normal;word-break:break-all;font-size:11px;opacity:.75}
.res.bad{color:#f87171;opacity:1}
</style>
<div class="grid" id="g"></div>
<div class="bar"><span class="cap" title="开：点按钮自动发送到会话；关：只填入输入框不发送">自动发送<button class="pill on" id="autosend" role="switch" aria-checked="true" aria-label="自动发送"><span class="knob"></span></button></span><span class="mut" id="modehint"></span></div>
<div class="grid"><button class="ref" id="b-refresh" title="重读片段与命令配置" hidden>↻ 重读配置</button></div>
<div class="t" id="t"></div>
<div class="res" id="out"></div>`;

const g = document.querySelector('#g') as HTMLElement;
const out = document.querySelector('#out') as HTMLElement;
const tEl = document.querySelector('#t') as HTMLElement;
const bRefresh = document.querySelector('#b-refresh') as HTMLButtonElement;
// 底部开关：是否点主按钮就自动发送；关=只填入输入框。持久化默认开（保持老行为）。
// 注：状态区 iframe 可能禁 localStorage，读写都必须 try 包住，否则首屏抛错导致按钮画不出。
const AUTO_KEY = 'oc-shortcuts-autosend';
const loadAuto = (): boolean => {
  try {
    return localStorage.getItem(AUTO_KEY) !== '0';
  } catch {
    return true;
  }
};
const saveAuto = (v: boolean): void => {
  try {
    localStorage.setItem(AUTO_KEY, v ? '1' : '0');
  } catch { /* 忽略持久化失败 */ }
};
let autoSend = loadAuto();
const autoBox = document.querySelector('#autosend') as HTMLButtonElement;
const modeHint = document.querySelector('#modehint') as HTMLElement;

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
    // 单按钮：按底部胶囊开关决定自动发送还是只填入
    const b = document.createElement('button');
    const c = colorFor(sc.label);
    b.style.borderColor = c;
    b.style.background = `color-mix(in srgb, ${c} 16%, transparent)`;
    b.textContent = sc.label;
    b.title = sc.text.length > 200 ? sc.text.slice(0, 200) : sc.text;
    b.onclick = () => void fire(host, sc.text, (t) => say(t), hasSession, autoSend);
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

// 底部胶囊开关：切换自动发送/只填入，持久化+回执
const syncHint = (): void => {
  autoBox.classList.toggle('on', autoSend);
  autoBox.setAttribute('aria-checked', String(autoSend));
  modeHint.textContent = autoSend ? '开：点即发送' : '关：只填入不发送';
};
autoBox.onclick = () => {
  autoSend = !autoSend;
  saveAuto(autoSend);
  syncHint();
  say(autoSend ? '已开自动发送' : '已关自动发送，只填入');
};
syncHint();

new ResizeObserver(() => fit()).observe(root);

// 首屏/切项目 paint 失败也要给回执，避免空白让人以为没按钮
const safePaint = (dir: string | null, force = false): void => {
  void paint(dir, force).catch((e) => say(`加载失败：${(e as Error).message?.slice(0, 60) ?? e}`, true));
};

setInterval(() => { if (!document.hidden) void paint(curDir); }, 30000);

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  curDir = ctx.directory ?? null;
  hasSession = !!ctx.session;
  // 新宿主把「↻」放到分区标题栏；老宿主保留区内按钮
  if (ctx.features?.statusControls === true) void publishControls();
  else bRefresh.hidden = false;
  safePaint(curDir);
});

// 切项目后宿主会清空标题栏控件，重新发布一次
host.onDirectory((next) => {
  curDir = next;
  if (headerControls) void publishControls();
  safePaint(curDir);
});
