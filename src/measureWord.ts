import type { TextMeasurement } from './fontSize'

// Read the layout of a word and of its slide.
// The component tests give a fake, because a test DOM has no layout. The smoke tests cover this function.
export type MeasureWord = (slide: HTMLElement, word: HTMLElement) => TextMeasurement

export const measureWordInBrowser: MeasureWord = (slide, word) => ({
  textWidth: word.getBoundingClientRect().width,
  fontSize: parseFloat(getComputedStyle(word).fontSize),
  availableWidth: slide.clientWidth,
  availableHeight: slide.clientHeight,
})
