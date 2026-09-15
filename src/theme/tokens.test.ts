import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { readRootVariables } from './cssVariables'
import { SLIDE_COLOURS } from './slideColours'
import { COLOURS, SLIDE_BACKGROUNDS, slideBackground } from './tokens'

// The downloads cannot use CSS, so tokens.ts has a copy of the colour tokens. The copy must be the same as src/index.css.
const variables = readRootVariables(readFileSync(new URL('../index.css', import.meta.url), 'utf8'))

// Give the CSS custom property for a camelCase name. Example: inkSoft gives --ink-soft.
const cssName = (name: string) => '--' + name.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase())

describe('COLOURS', () => {
  it.each(Object.entries(COLOURS))('has the same value for %s as src/index.css', (name, value) => {
    expect(value.toUpperCase()).toBe(variables.get(cssName(name))?.toUpperCase())
  })
})

describe('SLIDE_BACKGROUNDS', () => {
  it.each(SLIDE_COLOURS)('has the same value for %s as src/index.css', (colour) => {
    expect(SLIDE_BACKGROUNDS[colour].toUpperCase()).toBe(variables.get(`--slide-${colour}`)?.toUpperCase())
  })
})

describe('slideBackground', () => {
  it('gives the background colour for a slide index', () => {
    expect([0, 1, 5].map(slideBackground)).toEqual(['#FFF4D6', '#DDF0FF', '#FFF4D6'])
  })
})
