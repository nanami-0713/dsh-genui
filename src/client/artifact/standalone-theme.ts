/** standalone 页面使用的基础颜色和版面样式。 */
export const STANDALONE_THEME_CSS = `
:root {
  color-scheme: light;
  --dsw-alias-bg-base: #f8fafc;
  --dsw-alias-bg-layer-1: #ffffff;
  --dsw-alias-bg-layer-2: #f1f5f9;
  --dsw-alias-bg-layer-3: #e2e8f0;
  --dsw-alias-border-l1: #dbe2ea;
  --dsw-alias-border-l2: #cbd5e1;
  --dsw-alias-fill-hover: #eef2f7;
  --dsw-alias-label-primary: #1e293b;
  --dsw-alias-label-secondary: #64748b;
  --dsw-alias-label-tertiary: #94a3b8;
  --dsw-alias-label-caption: #64748b;
  --dsw-alias-markdown-code-block: #f1f5f9;
  --dsw-alias-markdown-hr: #cbd5e1;
  --dsw-alias-state-business-primary: #4b83f3;
  --dsw-alias-state-success-primary: #159947;
  --dsw-alias-state-success-secondary: #e8f7ed;
  --dsw-alias-state-warn-primary: #b7791f;
  --dsw-alias-state-warn-secondary: #fff7e6;
  --dsw-alias-state-error-primary: #d64545;
  --dsw-static-deepseek-300: #a8c7fa;
  --dsw-static-deepseek-400: #679efe;
  --dsw-static-deepseek-450: #4b83f3;
  --dsw-static-blue-450: #4b83f3;
  --dsw-static-green-400: #4ed17e;
  --dsw-static-amber-400: #f5b83d;
  --dsw-static-red-400: #f2707a;
  --dsw-static-neutral-bluish-400: #9aa3b2;
}
body[data-ds-dark-theme] {
  color-scheme: dark;
  --dsw-alias-bg-base: #11151b;
  --dsw-alias-bg-layer-1: #191f27;
  --dsw-alias-bg-layer-2: #222a35;
  --dsw-alias-bg-layer-3: #2d3744;
  --dsw-alias-border-l1: #303b49;
  --dsw-alias-border-l2: #465365;
  --dsw-alias-fill-hover: #2b3542;
  --dsw-alias-label-primary: #e8edf5;
  --dsw-alias-label-secondary: #a8b3c2;
  --dsw-alias-label-tertiary: #7f8b9b;
  --dsw-alias-label-caption: #a8b3c2;
  --dsw-alias-markdown-code-block: #202833;
  --dsw-alias-markdown-hr: #465365;
  --dsw-alias-state-business-primary: #7aa9ff;
  --dsw-alias-state-success-primary: #58cf82;
  --dsw-alias-state-success-secondary: #193a28;
  --dsw-alias-state-warn-primary: #f2bd58;
  --dsw-alias-state-warn-secondary: #3c321e;
  --dsw-alias-state-error-primary: #ff7b83;
  --dsw-static-deepseek-300: #a8c7fa;
  --dsw-static-deepseek-400: #679efe;
  --dsw-static-deepseek-450: #4b83f3;
  --dsw-static-blue-450: #4b83f3;
  --dsw-static-green-400: #4ed17e;
  --dsw-static-amber-400: #f5b83d;
  --dsw-static-red-400: #f2707a;
  --dsw-static-neutral-bluish-400: #9aa3b2;
}
html { min-height: 100%; }
body { margin: 0; min-height: 100vh; background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
#genui-root { width: min(1200px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }
`
