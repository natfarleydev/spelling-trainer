import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { contrastRatio } from './contrast'
import { CONTRAST_PAIRS } from './contrastPairs'
import { readRootVariables } from './cssVariables'

describe('readRootVariables', () => {
  it('reads the custom properties of the first :root block', () => {
    const css = ':root {\n  --ink: #1F2544;\n  --paper:#FFFBF2 ;\n  color: var(--ink);\n}\n.x { --ink: #000000; }'
    expect(readRootVariables(css)).toEqual(new Map([['--ink', '#1F2544'], ['--paper', '#FFFBF2']]))
  })

  it('gives an empty map when there is no :root block', () => {
    expect(readRootVariables('.x { --ink: #000; }')).toEqual(new Map())
  })
})

// The style guide in CLAUDE.md gives these tokens. The pages and the slides use them.
// Read the file with Node, because Vitest does not process CSS imports.
const css = readFileSync(new URL('../index.css', import.meta.url), 'utf8')
const variables = readRootVariables(css)

describe('the colour tokens in src/index.css', () => {
  it.each([
    '--paper', '--ink', '--ink-soft', '--line', '--line-strong', '--primary', '--primary-dark', '--on-primary',
    '--sunshine', '--coral', '--mint', '--grape', '--danger', '--success',
    '--slide-cream', '--slide-sky', '--slide-mint', '--slide-lilac', '--slide-peach',
  ])('defines %s as a hex colour', (token) => {
    expect(variables.get(token)).toMatch(/^#[0-9A-Fa-f]{6}$/)
  })

  it.each(CONTRAST_PAIRS)('$foreground on $background has a contrast of at least $minimum', ({ foreground, background, minimum }) => {
    const ratio = contrastRatio(variables.get(foreground) ?? '', variables.get(background) ?? '')
    expect(ratio).toBeGreaterThanOrEqual(minimum)
  })
})
