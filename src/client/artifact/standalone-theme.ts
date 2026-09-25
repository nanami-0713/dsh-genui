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
  /* DSH 静态调色板供语义状态别名使用。 */
  --dsw-static-deepseek-100: rgb(228, 237, 253);
  --dsw-static-deepseek-400: rgb(103, 158, 254);
  --dsw-static-deepseek-500: rgb(65, 118, 230);
  --dsw-static-deepseek-800: rgb(52, 65, 91);
  --dsw-static-green-100: rgb(230, 250, 237);
  --dsw-static-green-400: rgb(78, 209, 126);
  --dsw-static-green-500: rgb(34, 197, 94);
  --dsw-static-green-900: rgb(35, 60, 44);
  --dsw-static-amber-100: rgb(254, 245, 231);
  --dsw-static-amber-400: rgb(247, 173, 49);
  --dsw-static-amber-500: rgb(245, 158, 11);
  --dsw-static-amber-600: rgb(221, 134, 41);
  --dsw-static-amber-900: rgb(39, 36, 31);
  --dsw-static-red-400: rgb(242, 90, 90);
  --dsw-static-red-600: rgb(236, 19, 19);

  /* DSH 浅色主题语义状态别名。 */
  --dsw-alias-state-business-primary: var(--dsw-static-deepseek-500);
  --dsw-alias-state-business-tertiary: var(--dsw-static-deepseek-100);
  --dsw-alias-state-success-primary: var(--dsw-static-green-500);
  --dsw-alias-state-success-secondary: var(--dsw-static-green-400);
  --dsw-alias-state-success-tertiary: var(--dsw-static-green-100);
  --dsw-alias-state-warn-label: var(--dsw-static-amber-600);
  --dsw-alias-state-warn-primary: var(--dsw-static-amber-500);
  --dsw-alias-state-warn-secondary: var(--dsw-static-amber-400);
  --dsw-alias-state-warn-tertiary: var(--dsw-static-amber-100);
  --dsw-alias-state-error-primary: var(--dsw-static-red-600);
  --dsw-alias-state-error-secondary: var(--dsw-static-red-400);
  --dsw-static-deepseek-300: rgb(183, 200, 254);
  --dsw-static-deepseek-450: rgb(86, 134, 254);
  --dsw-static-blue-450: rgb(77, 147, 248);
  --dsw-static-neutral-bluish-400: rgb(173, 178, 184);
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
  /* DSH 深色主题语义状态别名。 */
  --dsw-alias-state-business-primary: var(--dsw-static-deepseek-400);
  --dsw-alias-state-business-tertiary: var(--dsw-static-deepseek-800);
  --dsw-alias-state-success-primary: var(--dsw-static-green-500);
  --dsw-alias-state-success-secondary: var(--dsw-static-green-400);
  --dsw-alias-state-success-tertiary: var(--dsw-static-green-900);
  --dsw-alias-state-warn-label: var(--dsw-static-amber-600);
  --dsw-alias-state-warn-primary: var(--dsw-static-amber-500);
  --dsw-alias-state-warn-secondary: var(--dsw-static-amber-400);
  --dsw-alias-state-warn-tertiary: var(--dsw-static-amber-900);
  --dsw-alias-state-error-primary: var(--dsw-static-red-400);
  --dsw-alias-state-error-secondary: var(--dsw-static-red-400);
}
html { min-height: 100%; }
body { margin: 0; min-height: 100vh; background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
#genui-root { width: min(1200px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 56px; }
`
