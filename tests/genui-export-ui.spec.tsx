import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ExportableGenuiBlock } from '../src/client/artifact/ExportableGenuiBlock.tsx'
import { renderGenuiFence } from '../src/client/index.tsx'
import { GenuiPanel } from '../src/client/panel.tsx'
import { applyPanelOperation, clearSessionPanel } from '../src/client/panel-store.ts'
import { GenuiToolView } from '../src/client/toolview.tsx'
import { TemplateDrawer } from '../src/client/TemplateDrawer.tsx'
import { setLocale } from '../src/client/i18n/index.ts'
import type { ToolCallBlock } from '@deepseek-ai/dsh-client-ui-chat/client'
import type { ToolCallViewProps } from '@deepseek-ai/dsh-client-ui-tool/client'

afterEach(() => {
  cleanup()
  clearSessionPanel('artifact-ui')
  setLocale('zh')
})

function toolProps(): ToolCallViewProps {
  const block = {
    kind: 'tool-result', seq: 1, time: 0, callId: 'call-artifact', call: { name: 'render_ui', argsRaw: '{}' },
    callTime: 1, content: [], isError: false, meta: { items: [{ type: 'text', content: 'Tool result' }] },
    callView: null, resultView: null, subCalls: [],
  } as unknown as ToolCallBlock
  return { callId: 'call-artifact', toolName: 'render_ui', block, sessionId: 'tool-session', openFile: () => {} } as unknown as ToolCallViewProps
}

describe('artifact export entry points', () => {
  it('shows the export menu only after a fence settles', () => {
    const raw = JSON.stringify({ title: 'Ready', items: [{ type: 'text', content: 'content' }] })
    const streaming = render(renderGenuiFence(raw, 'stream', { sessionId: 's' }) as never)
    expect(screen.queryByRole('button', { name: '导出' })).toBeNull()
    streaming.unmount()
    render(renderGenuiFence(raw, 'settled', { sessionId: 's', source: { id: 'source-1', order: [1, 0, 0] } }) as never)
    expect(screen.getByRole('button', { name: '导出' })).toBeTruthy()
  })

  it('shows export for settled tool and panel content', () => {
    const tool = render(<GenuiToolView {...toolProps()} />)
    expect(screen.getByRole('button', { name: '导出' })).toBeTruthy()
    tool.unmount()
    applyPanelOperation('artifact-ui', { sourceId: 'panel', order: [1, -1, 0], mode: 'replace', spec: { items: [{ type: 'text', content: 'Panel' }] } })
    render(<GenuiPanel sessionId="artifact-ui" sendGenuiAction={() => {}} insertTemplate={() => {}} />)
    fireEvent.click(document.querySelector('[data-genui-panel] .panelToggle') ?? document.querySelector('[data-genui-panel] button')!)
    expect(screen.getByRole('button', { name: '导出' })).toBeTruthy()
  })

  it('supports keyboard dismissal, accessible menu roles, English labels, and excludes template previews', () => {
    setLocale('en')
    const view = render(<ExportableGenuiBlock spec={{ items: [{ type: 'text', content: 'View' }] }} />)
    const trigger = screen.getByRole('button', { name: 'Export' })
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    fireEvent.click(trigger)
    expect(screen.getByRole('menuitem', { name: 'Standalone HTML' })).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('menu')).toBeNull()
    view.unmount()
    setLocale('zh')
    render(<TemplateDrawer tab="templates" onUse={() => {}} />)
    fireEvent.click(screen.getByText('项目仪表盘'))
    expect(document.querySelector('[data-genui-template-preview] [data-genui-export]')).toBeNull()
  })
})
