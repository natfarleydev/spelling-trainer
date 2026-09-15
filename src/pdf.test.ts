import { describe, expect, it } from 'vitest'
import { buildDeck } from './deck'
import { drawPdf, layoutPdf, PDF_PAGE, type PdfWriter } from './pdf'

// A fake measure: each character has a width of 0.5 for a font size of 1.
const measure = (text: string) => text.length * 0.5

describe('layoutPdf', () => {
  it('gives one page for each slide', () => {
    expect(layoutPdf(measure)(buildDeck(['because', 'friend']))).toHaveLength(2)
  })

  it('puts the word in the center of the page', () => {
    const [page] = layoutPdf(measure)(buildDeck(['because']))
    expect(page).toMatchObject({ text: 'because', x: PDF_PAGE.width / 2, y: PDF_PAGE.height / 2 })
  })

  it('makes a long word fit the width of the page', () => {
    const word = 'accommodation'
    const [page] = layoutPdf(measure)(buildDeck([word]))
    expect(page.fontSize * measure(word)).toBeLessThanOrEqual(PDF_PAGE.width)
  })

  it('gives a smaller font size for a longer word', () => {
    const [short, long] = layoutPdf(measure)(buildDeck(['necessary', 'accommodation']))
    expect(long.fontSize).toBeLessThan(short.fontSize)
  })

  it('keeps a short word smaller than the page height', () => {
    const [page] = layoutPdf(measure)(buildDeck(['a']))
    expect(page.fontSize).toBeLessThan(PDF_PAGE.height)
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
  it('draws each page, and adds a page before each page after the first', () => {
    const { writer, calls } = fakeWriter()
    drawPdf(writer, [
      { text: 'because', x: 1, y: 2, fontSize: 30 },
      { text: 'friend', x: 1, y: 2, fontSize: 40 },
    ])
    expect(calls).toEqual([
      ['setFontSize', 30],
      ['text', 'because', 1, 2, { align: 'center', baseline: 'middle' }],
      ['addPage', [PDF_PAGE.width, PDF_PAGE.height], 'landscape'],
      ['setFontSize', 40],
      ['text', 'friend', 1, 2, { align: 'center', baseline: 'middle' }],
    ])
  })
})
