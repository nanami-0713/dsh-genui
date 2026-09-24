import { createContext, useState, type CSSProperties, type ReactNode } from 'react'
import { t } from '../i18n/index.ts'

export interface DiffBlockLabels {
  copy: string
  copied: string
  codeLabel: string
  wrapLabel: string
  unwrapLabel: string
  collapseAria: string
  expandAria: (hidden: number) => string
  collapse: string
  expand: (hidden: number) => string
  files: (count: number) => string
}

export interface JsonTreeLabels {
  copyValue: string
  copyJson: string
  copyPath: string
  copyPrettyJson: string
  copyCompactJson: string
  copied: string
  copyFailed: string
  collapseNode: string
  expandNode: string
  copyButtonTitle: (action: string) => string
}

const codeStyle: CSSProperties = { overflow: 'auto', padding: 12, borderRadius: 8, background: 'var(--dsw-alias-bg-layer-2)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, lineHeight: 1.5, whiteSpace: 'pre-wrap' }

/** 在独立页面显示可复制的代码内容。 */
export function CodeBlock({ code, lang, copyLabel, copiedLabel }: { code: string; lang?: string; copyLabel?: string; copiedLabel?: string }): ReactNode {
  const [copied, setCopied] = useState(false)
  const copy = async (): Promise<void> => {
    await writeClipboard(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }
  return <div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--dsw-alias-label-secondary)' }}><span>{lang ?? t('label.code')}</span><button type="button" onClick={() => void copy()}>{copied ? copiedLabel ?? t('label.copied') : copyLabel ?? t('label.copy')}</button></div><pre style={codeStyle}><code>{code}</code></pre></div>
}

/** 在独立页面以差异文本显示文件变更。 */
export function DiffBlock({ diffs }: { diffs: Array<{ path: string; oldText?: string; newText?: string }>; labels?: DiffBlockLabels }): ReactNode {
  return <div>{diffs.map((diff, index) => <section key={`${diff.path}:${index}`}><strong>{diff.path}</strong><pre style={codeStyle}>{(diff.oldText ?? '').split('\n').map(line => `- ${line}`).concat((diff.newText ?? '').split('\n').map(line => `+ ${line}`)).join('\n')}</pre></section>)}</div>
}

/** 在独立页面显示 JSON，并提供本地折叠控制。 */
export function JsonTree({ data, label, copyable }: { data: object | unknown[]; label?: string; copyable?: boolean; labels?: JsonTreeLabels }): ReactNode {
  const [expanded, setExpanded] = useState(true)
  return <section><button type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? t('label.collapse') : t('label.expandNode')} {label ?? 'JSON'}</button>{copyable && <CodeBlock code={JSON.stringify(data, null, 2)} lang="json" />}{expanded && <pre style={codeStyle}>{JSON.stringify(data, null, 2)}</pre>}</section>
}

/** 将文本复制到系统剪贴板。 */
export async function writeClipboard(text: string): Promise<boolean> {
  if (typeof navigator.clipboard?.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  return copied
}

/** standalone 模式不连接 DSH 注册表，因此自定义组件始终不可用。 */
export function getGenuiComponent(_type: string): undefined {
  return undefined
}

/** standalone 模式专用的空动作上下文。 */
export const GenuiActionContext = createContext<((action: string, payload: Record<string, unknown>) => void) | undefined>(undefined)
