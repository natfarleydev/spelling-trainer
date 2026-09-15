import { describe, expect, it } from 'vitest'
import { buildDeck, type Deck } from './deck'
import { drawPdf, layoutPdf, PDF_PAGE, type PdfWriter } from './pdf'

// A fake measure: each character has a width of 0.5 for a font size of 1.
const measure = (text: string) => text.length * 0.5

const withSentences = (words: readonly string[], sentence = (word: string) => `The word is ${word}.`): Deck =>
  buildDeck(words, (word) => ({
    analysis: { type: 'other' },
    sentence: { template: 'The word is {word}.', text: sentence(word) },
  }))

describe('layoutPdf', () => {
  it('gives one page for each slide', () => {
    expect(layoutPdf(measure)(buildDeck(['because', 'friend']))).toHaveLength(2)
  })

  it('puts the word in the centre of the page when the slide has no sentence', () => {
    const [page] = layoutPdf(measure)(buildDeck(['because']))
    expect(page.word).toMatchObject({ text: 'because', x: PDF_PAGE.width / 2, y: PDF_PAGE.height / 2 })
    expect(page.sentence).toBeNull()
  })

  it('puts the word above the sentence when the slide has a sentence', () => {
    const [page] = layoutPdf(measure)(withSentences(['because']))
    expect(page.sentence).toMatchObject({ text: 'The word is because.', x: PDF_PAGE.width / 2 })
    expect(page.word.x).toBe(PDF_PAGE.width / 2)
    expect(page.word.y).toBeLessThan(page.sentence!.y)
    expect(page.sentence!.y).toBeLessThan(PDF_PAGE.height)
  })

  it('makes the sentence smaller than the word', () => {
    const [page] = layoutPdf(measure)(withSentences(['because']))
    expect(page.sentence!.fontSize).toBeLessThan(page.word.fontSize)
  })

  it('makes a long sentence fit the width of the page', () => {
    const text = 'x'.repeat(300)
    const [page] = layoutPdf(measure)(withSentences(['cat'], () => text))
    expect(page.sentence!.fontSize * measure(text)).toBeLessThanOrEqual(PDF_PAGE.width)
  })

  it('makes a long word fit the width of the page', () => {
    const word = 'accommodation'
    const [page] = layoutPdf(measure)(buildDeck([word]))
    expect(page.word.fontSize * measure(word)).toBeLessThanOrEqual(PDF_PAGE.width)
  })

  it('gives a smaller font size for a longer word', () => {
    const [short, long] = layoutPdf(measure)(buildDeck(['necessary', 'accommodation']))
    expect(long.word.fontSize).toBeLessThan(short.word.fontSize)
  })

  it('keeps a short word smaller than the page height', () => {
    const [page] = layoutPdf(measure)(buildDeck(['a']))
    expect(page.word.fontSize).toBeLessThan(PDF_PAGE.height)
  })
})

// A fake writer that records each call.
function fakeWriter() {
  const calls: unknown[][] = []
  const writer: PdfWriter = {
    addPage: (...args) => calls.push(['addPage', ...args]),
    setFontSize: (...args) => calls.push(['setFontSize', ...args]),
    text: (...args) => calls.push(['text', ...args]),
  }
  return { writer, calls }
}

describe('drawPdf', () => {
  it('draws the word and the sentence of each page, and adds a page before each page after the first', () => {
    const { writer, calls } = fakeWriter()
    const centre = { align: 'center', baseline: 'middle' }
    drawPdf(writer, [
      {
        word: { text: 'because', x: 1, y: 2, fontSize: 30 },
        sentence: { text: 'The word is because.', x: 1, y: 3, fontSize: 10 },
      },
      { word: { text: 'friend', x: 1, y: 2, fontSize: 40 }, sentence: null },
    ])
    expect(calls).toEqual([
      ['setFontSize', 30],
      ['text', 'because', 1, 2, centre],
      ['setFontSize', 10],
      ['text', 'The word is because.', 1, 3, centre],
      ['addPage', [PDF_PAGE.width, PDF_PAGE.height], 'landscape'],
      ['setFontSize', 40],
      ['text', 'friend', 1, 2, centre],
    ])
  })
})
