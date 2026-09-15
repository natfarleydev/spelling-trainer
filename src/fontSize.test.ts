import { describe, expect, it } from 'vitest'
import { estimateUnitWidth, fitFontSize, fitMeasuredFontSize, screenFontSize } from './fontSize'

describe('fitMeasuredFontSize', () => {
  it('makes a word that is too wide smaller, so that it fills 90% of the available width', () => {
    // 400 px at 50 px gives 8 px of width for each 1 px of font size. 90% of 375 px is 337.5 px.
    expect(fitMeasuredFontSize({ textWidth: 400, fontSize: 50, availableWidth: 375, availableHeight: 700 })).toBe(
      337.5 / 8,
    )
  })

  it('makes a short word larger, but not more than 40% of the available height', () => {
    expect(fitMeasuredFontSize({ textWidth: 100, fontSize: 50, availableWidth: 1000, availableHeight: 500 })).toBe(200)
  })

  it('gives the same size when it measures a word at the size that it gave', () => {
    const first = fitMeasuredFontSize({ textWidth: 400, fontSize: 50, availableWidth: 375, availableHeight: 700 })!
    const second = fitMeasuredFontSize({
      textWidth: (400 / 50) * first,
      fontSize: first,
      availableWidth: 375,
      availableHeight: 700,
    })
    expect(second).toBeCloseTo(first, 10)
  })

  it.each([
    { textWidth: 0, fontSize: 50, availableWidth: 375, availableHeight: 700 },
    { textWidth: 400, fontSize: 0, availableWidth: 375, availableHeight: 700 },
    { textWidth: 400, fontSize: 50, availableWidth: 0, availableHeight: 700 },
    { textWidth: 400, fontSize: 50, availableWidth: 375, availableHeight: 0 },
    { textWidth: Number.NaN, fontSize: 50, availableWidth: 375, availableHeight: 700 },
  ])('gives null when a measurement is not available: %o', (measurement) => {
    expect(fitMeasuredFontSize(measurement)).toBeNull()
  })
})

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
