export type FitOptions = {
  // The width of the text for a font size of 1.
  readonly unitWidth: number
  readonly availableWidth: number
  readonly maxSize: number
}

// Give the largest font size that makes the text fit the available width.
export const fitFontSize = ({ unitWidth, availableWidth, maxSize }: FitOptions): number =>
  unitWidth > 0 ? Math.min(maxSize, availableWidth / unitWidth) : maxSize

// Estimate the width of the text for a font size of 1. Use this when a real measurement is not available.
export const estimateUnitWidth = (text: string, characterWidth: number): number => text.length * characterWidth

// The approximate width of one character on the screen, as a fraction of the font size.
const SCREEN_CHARACTER_WIDTH = 0.6
// The word fills a maximum of 90% of the screen width.
const SCREEN_AVAILABLE_VW = 90
const SCREEN_MAX_VW = 100
const SCREEN_MAX_VH = 40

const round2 = (value: number): number => Math.round(value * 100) / 100

// Give a CSS font size that makes the word fit the screen.
export const screenFontSize = (word: string): string => {
  const vw = fitFontSize({
    unitWidth: estimateUnitWidth(word, SCREEN_CHARACTER_WIDTH),
    availableWidth: SCREEN_AVAILABLE_VW,
    maxSize: SCREEN_MAX_VW,
  })
  return `min(${round2(vw)}vw, ${SCREEN_MAX_VH}vh)`
}
