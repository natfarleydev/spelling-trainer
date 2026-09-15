import { describe, expect, it } from 'vitest'
import { buildDeck, type Deck } from './deck'
import { drawPdf, layoutPdf, PDF_FONT, PDF_PAGE, type MeasureText, type PdfPage, type PdfWriter } from './pdf'
import { COLOURS } from './theme/tokens'

// A fake measure: a normal character has a width of 0.5 for a font size of 1, and a bold character 0.6.
const measure: MeasureText = (text, style) => text.length * (style === 'bold' ? 0.6 : 0.5)

const withSentences = (words: readonly string[], sentence = (word: string) => `The ${word} sat on the mat.`): Deck =>
  buildDeck(words, (word) => ({
    analysis: { type: 'other' },
    sentence: { template: '', text: sentence(word) },
  }))

const runWidth = (run: { text: string; bold: boolean }, fontSize: number) =>
  measure(run.text, run.bold ? 'bold' : 'normal') * fontSize

describe('layoutPdf', () => {
  it('gives one page for each slide', () => {
    expect(layoutPdf(measure)(buildDeck(['because', 'friend']))).toHaveLength(2)
  })

  it('gives each page the slide background colour for its index', () => {
    const pages = layoutPdf(measure)(buildDeck(['a', 'b', 'c', 'd', 'e', 'f']))
    expect(pages.map((page) => page.background)).toEqual(['#FFF4D6', '#DDF0FF', '#DDF7EC', '#EDE6FF', '#FFE4DC', '#FFF4D6'])
  })

  it('puts the bold word in ink in the centre of the page when the slide has no sentence', () => {
    const [page] = layoutPdf(measure)(buildDeck(['because']))
    expect(page.word).toMatchObject({
      text: 'because',
      x: PDF_PAGE.width / 2,
      y: PDF_PAGE.height / 2,
      colour: COLOURS.ink,
      bold: true,
    })
    expect(page.sentence).toBeNull()
  })

  it('puts the word above the sentence when the slide has a sentence', () => {
    const [page] = layoutPdf(measure)(withSentences(['cat']))
    expect(page.word.x).toBe(PDF_PAGE.width / 2)
    expect(page.word.y).toBeLessThan(page.sentence!.y)
    expect(page.sentence!.y).toBeLessThan(PDF_PAGE.height)
  })

  it('splits the sentence into runs, with the word under test in bold ink and the other text in soft ink', () => {
    const [page] = layoutPdf(measure)(withSentences(['cat']))
    expect(page.sentence!.runs.map(({ text, bold, colour }) => ({ text, bold, colour }))).toEqual([
      { text: 'The ', bold: false, colour: COLOURS.inkSoft },
      { text: 'cat', bold: true, colour: COLOURS.ink },
      { text: ' sat on the mat.', bold: false, colour: COLOURS.inkSoft },
    ])
  })

  it('puts the runs next to each other, with the full sentence in the centre of the page', () => {
    const [page] = layoutPdf(measure)(withSentences(['cat']))
    const { runs, fontSize } = page.sentence!
    runs.slice(1).forEach((run, i) => {
      expect(run.x).toBeCloseTo(runs[i].x + runWidth(runs[i], fontSize), 6)
    })
    const total = runs.reduce((sum, run) => sum + runWidth(run, fontSize), 0)
    expect(runs[0].x + total / 2).toBeCloseTo(PDF_PAGE.width / 2, 6)
  })

  it('underlines the word under test in the primary colour', () => {
    const [page] = layoutPdf(measure)(withSentences(['cat']))
    const { runs, fontSize, underline } = page.sentence!
    const word = runs[1]
    expect(underline).toMatchObject({ x1: word.x, colour: COLOURS.primary })
    expect(underline!.x2).toBeCloseTo(word.x + runWidth(word, fontSize), 6)
    expect(underline!.y).toBeGreaterThan(page.sentence!.y)
    expect(underline!.width).toBeGreaterThan(0)
  })

  it('gives one run and no underline when the sentence does not contain the word', () => {
    const [page] = layoutPdf(measure)(withSentences(['cat'], () => 'The dog ran.'))
    expect(page.sentence!.runs).toEqual([expect.objectContaining({ text: 'The dog ran.', bold: false })])
    expect(page.sentence!.underline).toBeNull()
  })

  it('makes the sentence smaller than the word', () => {
    const [page] = layoutPdf(measure)(withSentences(['cat']))
    expect(page.sentence!.fontSize).toBeLessThan(page.word.fontSize)
  })

  it('makes a long sentence fit the width of the page', () => {
    const [page] = layoutPdf(measure)(withSentences(['cat'], () => `The cat ${'x'.repeat(300)}`))
    const { runs, fontSize } = page.sentence!
    expect(runs.reduce((sum, run) => sum + runWidth(run, fontSize), 0)).toBeLessThanOrEqual(PDF_PAGE.width)
  })

  it('makes a long word fit the width of the page', () => {
    const word = 'accommodation'
    const [page] = layoutPdf(measure)(buildDeck([word]))
    expect(page.word.fontSize * measure(word, 'bold')).toBeLessThanOrEqual(PDF_PAGE.width)
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
  const record =
    (name: string) =>
    (...args: unknown[]) => {
      calls.push([name, ...args])
    }
  const writer: PdfWriter = {
    addPage: record('addPage'),
    setFillColor: record('setFillColor'),
    rect: record('rect'),
    setFont: record('setFont'),
    setTextColor: record('setTextColor'),
    setFontSize: record('setFontSize'),
    text: record('text'),
    setDrawColor: record('setDrawColor'),
    setLineWidth: record('setLineWidth'),
    line: record('line'),
  }
  return { writer, calls }
}

const page: PdfPage = {
  background: '#FFF4D6',
  word: { text: 'cat', x: 480, y: 200, fontSize: 100, colour: '#1F2544', bold: true },
  sentence: {
    y: 420,
    fontSize: 30,
    runs: [
      { text: 'The ', x: 300, bold: false, colour: '#4A4F6A' },
      { text: 'cat', x: 360, bold: true, colour: '#1F2544' },
    ],
    underline: { x1: 360, x2: 414, y: 440, colour: '#2657D4', width: 3 },
  },
}

describe('drawPdf', () => {
  it('draws the background, the word, the runs of the sentence and the underline', () => {
    const { writer, calls } = fakeWriter()
    drawPdf(writer, [page])
    expect(calls).toEqual([
      ['setFillColor', '#FFF4D6'],
      ['rect', 0, 0, PDF_PAGE.width, PDF_PAGE.height, 'F'],
      ['setFont', PDF_FONT, 'bold'],
      ['setTextColor', '#1F2544'],
      ['setFontSize', 100],
      ['text', 'cat', 480, 200, { align: 'center', baseline: 'middle' }],
      ['setFontSize', 30],
      ['setFont', PDF_FONT, 'normal'],
      ['setTextColor', '#4A4F6A'],
      ['text', 'The ', 300, 420, { align: 'left', baseline: 'middle' }],
      ['setFont', PDF_FONT, 'bold'],
      ['setTextColor', '#1F2544'],
      ['text', 'cat', 360, 420, { align: 'left', baseline: 'middle' }],
      ['setDrawColor', '#2657D4'],
      ['setLineWidth', 3],
      ['line', 360, 440, 414, 440],
    ])
  })

  it('adds a page before each page after the first', () => {
    const { writer, calls } = fakeWriter()
    drawPdf(writer, [page, { ...page, sentence: null }])
    const addPageCalls = calls.filter(([name]) => name === 'addPage')
    expect(addPageCalls).toEqual([['addPage', [PDF_PAGE.width, PDF_PAGE.height], 'landscape']])
    expect(calls.findIndex(([name]) => name === 'addPage')).toBeGreaterThan(0)
  })

  it('draws no sentence and no underline for a page without a sentence', () => {
    const { writer, calls } = fakeWriter()
    drawPdf(writer, [{ ...page, sentence: null }])
    expect(calls.filter(([name]) => name === 'text')).toHaveLength(1)
    expect(calls.filter(([name]) => name === 'line')).toHaveLength(0)
  })
})
