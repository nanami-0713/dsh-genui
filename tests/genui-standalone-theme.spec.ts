import { describe, expect, it } from 'vitest'
import { STANDALONE_THEME_CSS } from '../src/client/artifact/standalone-theme.ts'

describe('standalone theme', () => {
  it('keeps DSH light semantic state aliases', () => {
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-green-400: rgb(78, 209, 126);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-success-secondary: var(--dsw-static-green-400);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-success-primary: var(--dsw-static-green-500);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-warn-secondary: var(--dsw-static-amber-400);')
  })

  it('keeps DSH dark semantic state aliases', () => {
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-business-primary: var(--dsw-static-deepseek-400);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-business-tertiary: var(--dsw-static-deepseek-800);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-success-tertiary: var(--dsw-static-green-900);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-warn-tertiary: var(--dsw-static-amber-900);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-error-primary: var(--dsw-static-red-400);')
  })
})
