import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createGenuiArtifact } from '../src/client/artifact/create.ts'
import '../src/client/standalone/runtime.tsx'
import { setLocale } from '../src/client/i18n/index.ts'

afterEach(() => {
  cleanup()
  document.body.removeAttribute('data-ds-dark-theme')
  localStorage.clear()
  setLocale('zh')
})

describe('standalone runtime', () => {
  it('restores artifact presentation and durable state while keeping model actions inactive', () => {
    const artifact = createGenuiArtifact({ items: [
      { type: 'button', label: 'Run', action: 'run' },
      { type: 'input', label: 'Keyword', id: 'keyword' },
    ] }, { fields: { keyword: 'saved value' } }, { locale: 'en', theme: 'dark' })
    const root = document.createElement('main')
    document.body.appendChild(root)
    let unmount = () => {}
    act(() => { unmount = window.__GenuiStandalone__!.mount(root, artifact) })
    expect(document.body.hasAttribute('data-ds-dark-theme')).toBe(true)
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('saved value')
    expect((screen.getByRole('button', { name: 'Run' }) as HTMLButtonElement).disabled).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Run' }))
    act(() => unmount())
  })

  it('keeps local tabs, accordion, and grading available without an action provider', () => {
    const artifact = createGenuiArtifact({ items: [
      { type: 'tabs', tabs: [{ label: 'One', items: [{ type: 'text', content: 'Tab one' }] }, { label: 'Two', items: [{ type: 'text', content: 'Tab two' }] }] },
      { type: 'accordion', items: [{ title: 'Details', items: [{ type: 'text', content: 'Expanded locally' }] }] },
      { type: 'radio', group: 'q1', options: ['A', 'B'], answer: 'A' },
      { type: 'submit', label: 'Grade', groups: ['q1'] },
    ] })
    const root = document.createElement('main')
    document.body.appendChild(root)
    let unmount = () => {}
    act(() => { unmount = window.__GenuiStandalone__!.mount(root, artifact) })
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }))
    expect(screen.getByText('Tab two')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Details/ }))
    expect(screen.queryByText('Expanded locally')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /Details/ }))
    expect(screen.getByText('Expanded locally')).toBeTruthy()
    fireEvent.click(screen.getByRole('radio', { name: 'A' }))
    fireEvent.click(screen.getByRole('button', { name: 'Grade' }))
    expect(screen.getByText(/得分/)).toBeTruthy()
    act(() => unmount())
  })
})
