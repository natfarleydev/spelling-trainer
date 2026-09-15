import type { Deck } from './deck'
import { fitFontSize } from './fontSize'

export const PDF_FILE_NAME = 'spelling-words.pdf'

// The page size in points. The ratio is 16:9.
export const PDF_PAGE = { width: 960, height: 540 } as const

const MAX_WORD_FONT_SIZE = 220
const MAX_SENTENCE_FONT_SIZE = 40
// A text fills a maximum of 85% of the page width.
const FILL = 0.85
// When a page has a sentence, the word is higher on the page and the sentence is under the word.
const WORD_Y_WITH_SENTENCE = 0.42
const SENTENCE_Y = 0.78

export type PdfText = {
  readonly text: string
  readonly x: number
  readonly y: number
  readonly fontSize: number
}

export type PdfPage = {
  readonly word: PdfText
  // A slide from schema version 1 has no sentence.
  readonly sentence: PdfText | null
}

// Give the width of the text for a font size of 1.
export type MeasureText = (text: string) => number

const fitToPage = (measure: MeasureText, text: string, maxSize: number): number =>
  fitFontSize({ unitWidth: measure(text), availableWidth: FILL * PDF_PAGE.width, maxSize })

// Calculate the positions and the font sizes of the texts on each page.
export const layoutPdf =
  (measure: MeasureText) =>
  (deck: Deck): readonly PdfPage[] =>
    deck.map(({ word, sentence }) => ({
      word: {
        text: word,
        x: PDF_PAGE.width / 2,
        y: PDF_PAGE.height * (sentence ? WORD_Y_WITH_SENTENCE : 0.5),
        fontSize: fitToPage(measure, word, MAX_WORD_FONT_SIZE),
      },
      sentence: sentence
        ? {
            text: sentence.text,
            x: PDF_PAGE.width / 2,
            y: PDF_PAGE.height * SENTENCE_Y,
            fontSize: fitToPage(measure, sentence.text, MAX_SENTENCE_FONT_SIZE),
          }
        : null,
    }))

const CENTRE = { align: 'center', baseline: 'middle' } as const

// The jsPDF methods that drawPdf uses.
export type PdfWriter = {
  addPage: (format: [number, number], orientation: 'landscape') => unknown
  setFontSize: (size: number) => unknown
  text: (text: string, x: number, y: number, options: typeof CENTRE) => unknown
}

const drawText = (writer: PdfWriter, { text, x, y, fontSize }: PdfText): void => {
  writer.setFontSize(fontSize)
  writer.text(text, x, y, CENTRE)
}

// Draw the pages with the writer. The writer already has the first page.
export const drawPdf = (writer: PdfWriter, pages: readonly PdfPage[]): void => {
  pages.forEach((page, i) => {
    if (i > 0) writer.addPage([PDF_PAGE.width, PDF_PAGE.height], 'landscape')
    drawText(writer, page.word)
    if (page.sentence) drawText(writer, page.sentence)
  })
}

// The imperative shell: load jsPDF, draw the deck, then download the file.
export const downloadPdf = async (deck: Deck): Promise<void> => {
  // Load jsPDF only when necessary. This keeps the first download of the app small.
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [PDF_PAGE.width, PDF_PAGE.height] })
  doc.setFont('helvetica', 'normal')
  drawPdf(doc, layoutPdf((text) => doc.getStringUnitWidth(text))(deck))
  doc.save(PDF_FILE_NAME)
}
