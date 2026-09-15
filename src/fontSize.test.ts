import { describe, expect, it } from 'vitest'
import { estimateUnitWidth, fitFontSize, screenFontSize } from './fontSize'

describe('fitFontSize', () => {
  it('gives the font size that makes the text fill the available width', () => {
    expect(fitFontSize({ unitWidth: 4, availableWidth: 400, maxSize: 1000 })).toBe(100)
  })

  it('does not give more than the maximum size', () => {
    expect(fitFontSize({ unitWidth: 1, availableWidth: 400, maxSize: 200 })).toBe(200)
  })

  it('gives the maximum size when the text has no width', () => {
    expect(fitFontSize({ unitWidth: 0, availableWidth: 400, maxSize: 200 })).toBe(200)
  })
})

describe('estimateUnitWidth', () => {
  it('multiplies the number of characters by the character width', () => {
    expect(estimateUnitWidth('because', 0.5)).toBe(3.5)
  })
})

describe('screenFontSize', () => {
  it('gives a CSS size that fits the word to the screen width, with a limit on the height', () => {
    expect(screenFontSize('because')).toBe('min(21.43vw, 40vh)')
  })

  it('gives a smaller size for a longer word', () => {
    const size = (css: string) => Number(css.match(/min\(([\d.]+)vw/)?.[1])
    expect(size(screenFontSize('accommodate'))).toBeLessThan(size(screenFontSize('cat')))
  })
})
