import { describe, expect, it } from 'vitest'
import { contrastRatio, parseHexColour, relativeLuminance } from './contrast'

describe('parseHexColour', () => {
  it('reads a 6-digit hex colour', () => {
    expect(parseHexColour('#FF8000')).toEqual([255, 128, 0])
  })

  it('reads a 3-digit hex colour', () => {
    expect(parseHexColour('#f80')).toEqual([255, 136, 0])
  })

  it.each(['red', '#12345', '#GGGGGG', '', 'FF8000'])('rejects %j', (value) => {
    expect(() => parseHexColour(value)).toThrow()
  })
})

describe('relativeLuminance', () => {
  it('gives 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBe(0)
    // The three WCAG weights add to 1, but floating point can give a very small difference.
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1, 10)
  })
})

describe('contrastRatio', () => {
  it('gives 21 for black on white', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 10)
  })

  it('gives 1 for the same colour', () => {
    expect(contrastRatio('#2657D4', '#2657D4')).toBeCloseTo(1, 10)
  })

  it('gives the same ratio in both orders', () => {
    expect(contrastRatio('#1F2544', '#FFFBF2')).toBeCloseTo(contrastRatio('#FFFBF2', '#1F2544'), 10)
  })

  it('agrees with a known WCAG value: #767676 on white is just above 4.5', () => {
    expect(contrastRatio('#767676', '#FFFFFF')).toBeCloseTo(4.54, 2)
  })
})
