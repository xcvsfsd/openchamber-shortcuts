// Work Status 快捷区：放 Git 下面，一排按钮点即发。来源同面板：OpenChamber 配置。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import { COMPARE_SNIPPET, loadShortcuts, fire } from '../shared/shortcuts.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

root.innerHTML = `<style>
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:6px}
.grid{display:flex;flex-wrap:wrap;gap:6px}
button{padding:4px 10px;font-size:13px;border:1px solid var(--oc-border,#8888);border-radius:8px;color:var(--oc-fg,inherit);font-weight:700;cursor:pointer}
button.cmd{background:color-mix(in srgb,var(--primary,#3574f0) 14%,transparent);border-color:var(--primary,#3574f0)}
button.snip{background:color-mix(in srgb,#8b5cf6 16%,transparent);border-color:#8b5cf6}
.mut{font-size:12px;opacity:.7}
</style><div class="grid" id="g"></div><div class="mut" id="out"></div>`;
const g = document.querySelector('#g') as HTMLElement;
const out = document.querySelector('#out') as HTMLElement;

const paint = async (dir: string | null): Promise<void> => {
  g.innerHTML = '';
  const { list } = await loadShortcuts(host, dir);
  for (const sc of [...list, COMPARE_SNIPPET]) {
    const b = document.createElement('button');
    b.className = sc === COMPARE_SNIPPET ? 'snip' : 'cmd';
    b.textContent = sc.label;
    b.title = sc.text;
    b.onclick = () => void fire(host, sc.text, (t) => { out.textContent = t; });
    g.appendChild(b);
  }
  const h = Math.ceil(root.getBoundingClientRect().height);
  void host.setHeight(h).catch(() => undefined);
};

new ResizeObserver(() => {
  const h = Math.ceil(root.getBoundingClientRect().height);
  void host.setHeight(h).catch(() => undefined);
}).observe(root);

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  void paint(ctx.directory ?? null);
});
