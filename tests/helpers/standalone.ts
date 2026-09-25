/**
 * 将 standalone HTML 解析为 jsdom 文档，供结构化断言使用。
 *
 * @param html - standalone HTML 文本
 * @returns 已解析的 HTML 文档
 */
export function parseHtml(html: string): Document {
  return new DOMParser().parseFromString(html, 'text/html')
}

/**
 * 将 Base64 文本恢复为 UTF-8 字符串。
 *
 * @param encoded - Base64 编码内容
 * @returns 解码后的 UTF-8 文本
 */
export function decodeBase64Text(encoded: string): string {
  const bytes = Uint8Array.from(
    atob(encoded),
    character => character.charCodeAt(0),
  )

  return new TextDecoder().decode(bytes)
}

/**
 * 读取 HTML 中导出的 GenUI artifact。
 *
 * @param doc - standalone HTML 文档
 * @returns 解析后的 artifact 数据
 */
export function artifactFromDocument(doc: Document): unknown {
  const element = doc.querySelector('#genui-artifact')

  if (element === null) {
    throw new Error('missing #genui-artifact')
  }

  return JSON.parse(
    decodeBase64Text(element.textContent?.trim() ?? ''),
  )
}

/**
 * 按文档顺序返回 HTML 中嵌入的 bundle 名称。
 *
 * @param doc - standalone HTML 文档
 * @returns bundle 名称列表
 */
export function bundleNames(doc: Document): string[] {
  return Array.from(
    doc.querySelectorAll<HTMLScriptElement>(
      'script[data-genui-bundle]',
    ),
  ).map(element => element.dataset.genuiBundle ?? '')
}

/**
 * 解码指定名称的 bundle 内容。
 *
 * @param doc - standalone HTML 文档
 * @param name - bundle 名称
 * @returns 解码后的 bundle 文本
 */
export function bundleText(doc: Document, name: string): string {
  const element = Array.from(
    doc.querySelectorAll<HTMLScriptElement>(
      'script[data-genui-bundle]',
    ),
  ).find(candidate => candidate.dataset.genuiBundle === name)

  if (element === undefined) {
    throw new Error(`missing standalone bundle: ${name}`)
  }

  return decodeBase64Text(element.textContent?.trim() ?? '')
}

/**
 * 将 CSP meta 内容解析为 directive 到值列表的映射。
 *
 * @param doc - standalone HTML 文档
 * @returns CSP directive 映射
 */
export function cspFromDocument(
  doc: Document,
): Record<string, string[]> {
  const content = doc
    .querySelector('meta[http-equiv="Content-Security-Policy"]')
    ?.getAttribute('content')

  if (content === null || content === undefined) {
    throw new Error('missing CSP')
  }

  return Object.fromEntries(
    content
      .split(';')
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => {
        const [directive, ...values] = part.split(/\s+/)
        return [directive!, values]
      }),
  )
}

/**
 * 通过 jsdom CSSOM 读取指定 selector 的最终声明。
 *
 * @param css - 待检查的 CSS 文本
 * @param selector - 目标 selector
 * @returns CSS property 到值的映射
 */
export function cssDeclarations(
  css: string,
  selector: string,
): Record<string, string> {
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)

  try {
    const rules = Array.from(style.sheet?.cssRules ?? []).filter((rule): rule is CSSStyleRule => (
      'selectorText' in rule
      && rule.selectorText === selector
    ))

    if (rules.length === 0) {
      throw new Error(`missing CSS rule: ${selector}`)
    }

    const declarations: Record<string, string> = {}

    for (const rule of rules) {
      for (let index = 0; index < rule.style.length; index += 1) {
        const name = rule.style[index]
        declarations[name] = rule.style.getPropertyValue(name).trim()
      }
    }

    return declarations
  } finally {
    style.remove()
  }
}
