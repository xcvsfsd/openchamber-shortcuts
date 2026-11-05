// 分支⇄Tag 对比输入框：用你填的具体分支/tag，不做泛化。
export const openCompareDialog = (
  root: HTMLElement,
  onSubmit: (branch: string, tag: string) => void,
): void => {
  const overlay = root.ownerDocument.createElement('div');
  overlay.style.cssText =
    'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);z-index:30;padding:16px;';
  overlay.innerHTML = `
    <div style="background:var(--oc-elevated,#1c1c1e);border:1px solid var(--oc-border,#8888);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px;width:100%;max-width:320px;">
      <div style="font-size:14px;font-weight:700">分支 ⇄ Tag 对比</div>
      <input id="cmp-branch" placeholder="分支如 develop_3c空=当前分支" style="padding:7px 9px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:inherit;color:inherit" />
      <input id="cmp-tag" placeholder="Tag 如 v1.2.0空=最新tag" style="padding:7px 9px;font-size:14px;border:1px solid var(--oc-border,#8888);border-radius:8px;background:inherit;color:inherit" />
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button id="cmp-cancel" style="padding:6px 12px;border-radius:8px;border:1px solid var(--oc-border,#8888);background:inherit;color:inherit;cursor:pointer">取消</button>
        <button id="cmp-ok" style="padding:6px 12px;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer">对比</button>
      </div>
    </div>`;
  const close = (): void => overlay.remove();
  const branchEl = overlay.querySelector('#cmp-branch') as HTMLInputElement;
  const tagEl = overlay.querySelector('#cmp-tag') as HTMLInputElement;
  (overlay.querySelector('#cmp-cancel') as HTMLButtonElement).onclick = close;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  (overlay.querySelector('#cmp-ok') as HTMLButtonElement).onclick = () => {
    const b = branchEl.value.trim();
    const t = tagEl.value.trim();
    close();
    onSubmit(b, t);
  };
  root.appendChild(overlay);
  branchEl.focus();
};

// 用填的具体名组装：都不填才走当前分支/最新 tag
export const compareText = (branch: string, tag: string): string => {
  const target = branch && tag
    ? `分支 ${branch} 与 tag ${tag}`
    : branch
      ? `分支 ${branch} 与最新 tag`
      : tag
        ? `当前分支与 tag ${tag}`
        : '当前分支与最新 tag';
  return `对比${target}：用 git log 和 git diff 列出提交差异和文件变更，最后总结变化点`;
};
