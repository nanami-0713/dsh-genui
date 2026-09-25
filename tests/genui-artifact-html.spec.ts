import { describe, expect, it } from 'vitest'
import { createServer } from 'node:http'
import { createStandaloneHtmlDocument } from '../src/client/artifact/html.ts'
import { createGenuiArtifact } from '../src/client/artifact/create.ts'
import { buildStandaloneHtml } from '../src/client/artifact/html.ts'
import { setGenuiAssetBase } from '../src/client/asset-loader.ts'
import type { GenuiSpec } from '../src/client/spec.ts'

describe('standalone HTML serialization', () => {
  it('keeps artifact text and bundles inside base64 payloads under a restrictive CSP', () => {
    const attack = '</script><script>window.pwned=true</script>'
    const artifact = createGenuiArtifact({ title: 'Offline view', items: [{ type: 'text', content: attack }] } as GenuiSpec)
    const bundles = new Map([
      ['standalone-runtime.js', new TextEncoder().encode('data:font/woff2;base64,AA==;window.runtimeReady=true;')],
    ])
    const html = createStandaloneHtmlDocument(artifact, bundles)
    expect(html).toContain('<!doctype html>')
    expect(html).toContain('charset="utf-8"')
    expect(html).toContain('name="viewport"')
    expect(html).toContain("connect-src 'none'")
    expect(html).toContain('id="genui-root"')
    expect(html).toContain('id="genui-artifact"')
    expect(html).not.toContain(attack)
    expect(html).not.toContain('window.pwned=true')
    expect(html).toContain(btoa(JSON.stringify(artifact)))
    const runtimePayload = html.match(/data-genui-bundle="runtime">([^<]+)</)?.[1]
    expect(runtimePayload).toBeDefined()
    expect(new TextDecoder().decode(Uint8Array.from(atob(runtimePayload!), character => character.charCodeAt(0)))).toContain('data:font/woff2;base64,')
    expect(html.match(/<script\b/g)?.length).toBe(3)
  })

  it('embeds only required engine payloads', () => {
    const artifact = createGenuiArtifact({ items: [{ type: 'mermaid', code: 'graph TD; A-->B' }] } as unknown as GenuiSpec)
    const html = createStandaloneHtmlDocument(artifact, new Map([
      ['standalone-runtime.js', new TextEncoder().encode('runtime')],
      ['mermaid.js', new TextEncoder().encode('mermaid-engine')],
    ]))
    expect(html).toContain('data-genui-bundle="mermaid"')
    expect(html).not.toContain('data-genui-bundle="three"')
    expect(html).not.toContain('mermaid-engine')
  })

  it('resolves relative media in HTML while preserving JSON artifact values', () => {
    const artifact = createGenuiArtifact({ items: [
      { type: 'image', src: '/attachments/foo.png' },
      { type: 'video', src: 'media/demo.mp4', poster: 'media/poster.png' },
    ] } as GenuiSpec)
    const html = createStandaloneHtmlDocument(artifact, new Map([['standalone-runtime.js', new TextEncoder().encode('runtime')]]), 'https://example.com/reports/page')
    const encoded = html.match(/id="genui-artifact">([^<]+)</)?.[1]
    const exported = JSON.parse(atob(encoded!))
    expect(exported.spec.items.map((item: { src: string }) => item.src)).toEqual(['https://example.com/attachments/foo.png', 'https://example.com/reports/media/demo.mp4'])
    expect(exported.spec.items[1].poster).toBe('https://example.com/reports/media/poster.png')
    expect(artifact.spec.items[0]).toMatchObject({ src: '/attachments/foo.png' })
  })

  it('embeds canonical DSH semantic colors in standalone HTML', () => {
    const artifact = createGenuiArtifact({
      items: [{
        type: 'table',
        columns: ['Service', 'Error rate'],
        rows: [['api-gateway', '0.04%']],
        types: ['text', 'delta'],
      }],
    }, undefined, { theme: 'dark' })
    const html = createStandaloneHtmlDocument(artifact, new Map([
      ['standalone-runtime.js', new TextEncoder().encode('runtime')],
    ]))

    expect(html).toContain('--dsw-alias-state-success-secondary: var(--dsw-static-green-400)')
    expect(html).toContain('--dsw-static-green-400: rgb(78, 209, 126)')
    expect(html).toContain('--dsw-alias-state-business-primary: var(--dsw-static-deepseek-400)')
    expect(html).toContain('--dsw-static-deepseek-400: rgb(122, 170, 255)')
  })

  it('rejects custom renderers before fetching standalone bundles', async () => {
    const artifact = createGenuiArtifact({ items: [{ type: 'weather', temp: 20 }] } as unknown as GenuiSpec)
    await expect(buildStandaloneHtml(artifact)).rejects.toMatchObject({ code: 'unsupported-custom-component' })
  })

  it('retries bundle fetching after a failed request', async () => {
    let requestCount = 0
    const server = createServer((_request, response) => {
      requestCount += 1
      if (requestCount === 1) {
        response.writeHead(503).end('temporarily unavailable')
        return
      }
      response.writeHead(200, { 'content-type': 'application/javascript' }).end('globalThis.standaloneRuntimeLoaded = true;')
    })
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
    const address = server.address()
    if (address === null || typeof address === 'string') throw new Error('local test server did not bind to a TCP port')
    setGenuiAssetBase(`http://127.0.0.1:${address.port}/`)

    try {
      const artifact = createGenuiArtifact({ items: [{ type: 'text', content: 'retry' }] })
      await expect(buildStandaloneHtml(artifact)).rejects.toMatchObject({ code: 'runtime-fetch-failed' })
      const html = await buildStandaloneHtml(artifact)

      expect(requestCount).toBe(2)
      expect(html).toContain('data-genui-bundle="runtime"')
      expect(html).toContain(btoa('globalThis.standaloneRuntimeLoaded = true;'))
    } finally {
      await new Promise<void>((resolve, reject) => server.close(error => error === undefined ? resolve() : reject(error)))
    }
  })
})
