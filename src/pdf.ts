import type { Deck } from './deck'
import { fitFontSize } from './fontSize'

export const PDF_FILE_NAME = 'spelling-words.pdf'

// The page size in points. The ratio is 16:9.
export const PDF_PAGE = { width: 960, height: 540 } as const

const MAX_FONT_SIZE = 220
// The word fills a maximum of 85% of the page width.
const FILL = 0.85

export type PdfText = {
  readonly text: string
  readonly x: number
  readonly y: number
  readonly fontSize: number
}

// Give the width of the text for a font size of 1.
export type MeasureText = (text: string) => number

// Calculate the text position and the font size for each page.
export const layoutPdf =
  (measure: MeasureText) =>
  (deck: Deck): readonly PdfText[] =>
    deck.map(({ word }) => ({
      text: word,
      x: PDF_PAGE.width / 2,
      y: PDF_PAGE.height / 2,
      fontSize: fitFontSize({
        unitWidth: measure(word),
        availableWidth: FILL * PDF_PAGE.width,
        maxSize: MAX_FONT_SIZE,
      }),
    }))

// The jsPDF methods that drawPdf uses.
export type PdfWriter = {
  addPage: (format: [number, number], orientation: 'landscape') => unknown
  setFontSize: (size: number) => unknown
  text: (text: string, x: number, y: number, options: { align: 'center'; baseline: 'middle' }) => unknown
}

// Draw the pages with the writer. The writer already has the first page.
export const drawPdf = (writer: PdfWriter, pages: readonly PdfText[]): void => {
  pages.forEach((page, i) => {
    if (i > 0) writer.addPage([PDF_PAGE.width, PDF_PAGE.height], 'landscape')
    writer.setFontSize(page.fontSize)
    writer.text(page.text, page.x, page.y, { align: 'center', baseline: 'middle' })
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
