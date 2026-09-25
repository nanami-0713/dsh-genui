import { describe, expect, it } from 'vitest'
import { STANDALONE_THEME_CSS } from '../src/client/artifact/standalone-theme.ts'

describe('standalone theme', () => {
  it('uses DSH light surface, border, and label tokens', () => {
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-neutral-bluish-00: rgb(255, 255, 255);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-neutral-bluish-1000: rgb(15, 17, 21);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-neutral-bluish-700: rgb(97, 102, 107);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-bg-layer-1: var(--dsw-static-neutral-bluish-00);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-bg-layer-2: var(--dsw-static-neutral-bluish-00);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-bg-layer-3: var(--dsw-static-neutral-bluish-00);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-border-l1: rgba(0, 0, 0, 0.04);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-border-l2: rgba(0, 0, 0, 0.1);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-label-primary: var(--dsw-static-neutral-bluish-1000);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-label-secondary: var(--dsw-static-neutral-bluish-700);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-label-tertiary: var(--dsw-static-neutral-bluish-600);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-label-caption: var(--dsw-static-neutral-bluish-400);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-markdown-code-block: var(--dsw-static-neutral-bluish-50);')
  })

  it('uses DSH dark surface, border, and label tokens', () => {
    expect(STANDALONE_THEME_CSS.match(/--dsw-static-neutral-bluish-400:/g)).toHaveLength(1)
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-neutral-bluish-950: rgb(21, 21, 23);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-neutral-bluish-875: rgb(35, 35, 36);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-neutral-bluish-850: rgb(44, 44, 46);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-neutral-bluish-800: rgb(53, 54, 56);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-bg-base: var(--dsw-static-neutral-bluish-950);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-bg-layer-1: var(--dsw-static-neutral-bluish-875);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-bg-layer-2: var(--dsw-static-neutral-bluish-850);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-bg-layer-3: var(--dsw-static-neutral-bluish-800);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-border-l1: rgba(255, 255, 255, 0.06);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-border-l2: rgba(255, 255, 255, 0.12);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-label-primary: var(--dsw-static-neutral-bluish-50);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-label-secondary: var(--dsw-static-neutral-bluish-300);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-label-tertiary: var(--dsw-static-neutral-bluish-400);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-label-caption: var(--dsw-static-neutral-bluish-600);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-markdown-code-block: var(--dsw-static-neutral-bluish-900);')
  })

  it('keeps DSH light semantic state aliases', () => {
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-green-400: rgb(78, 209, 126);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-green-500: rgb(34, 197, 94);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-amber-400: rgb(247, 173, 49);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-red-400: rgb(242, 90, 90);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-success-secondary: var(--dsw-static-green-400);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-success-primary: var(--dsw-static-green-500);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-warn-secondary: var(--dsw-static-amber-400);')
  })

  it('keeps DSH dark semantic state aliases', () => {
    expect(STANDALONE_THEME_CSS).toContain('--dsw-static-deepseek-400: rgb(122, 170, 255);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-business-primary: var(--dsw-static-deepseek-400);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-business-tertiary: var(--dsw-static-deepseek-800);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-success-tertiary: var(--dsw-static-green-900);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-warn-tertiary: var(--dsw-static-amber-900);')
    expect(STANDALONE_THEME_CSS).toContain('--dsw-alias-state-error-primary: var(--dsw-static-red-400);')
  })
})
