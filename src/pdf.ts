import type { Deck } from './deck'
import { isTrueTypeFont } from './fontFile'
import { fitFontSize } from './fontSize'
import { splitSentence } from './sentences/highlight'
import { COLOURS, slideBackground } from './theme/tokens'

export const PDF_FILE_NAME = 'spelling-words.pdf'

// The page size in points. The ratio is 16:9.
export const PDF_PAGE = { width: 960, height: 540 } as const

// The name of the embedded font. The style guide uses Playpen Sans for the slides.
export const PDF_FONT = 'PlaypenSans'
// jsPDF always has Helvetica. The download uses it when the Playpen Sans files do not load.
const FALLBACK_FONT = 'helvetica'

const MAX_WORD_FONT_SIZE = 220
const MAX_SENTENCE_FONT_SIZE = 40
// A text fills a maximum of 85% of the page width.
const FILL = 0.85
// When a page has a sentence, the word is higher on the page and the sentence is under the word.
const WORD_Y_WITH_SENTENCE = 0.42
const SENTENCE_Y = 0.78
// The underline of the word under test, as fractions of the sentence font size, like the thick underline on the screen.
const UNDERLINE_OFFSET = 0.55
const UNDERLINE_WIDTH = 0.08

export type FontStyle = 'normal' | 'bold'

// Give the width of the text for a font size of 1, in the given font style.
export type MeasureText = (text: string, style: FontStyle) => number

export type PdfText = {
  readonly text: string
  readonly x: number
  readonly y: number
  readonly fontSize: number
  readonly colour: string
  readonly bold: boolean
}

// One part of the sentence. x is the left edge of the part.
export type PdfRun = {
  readonly text: string
  readonly x: number
  readonly bold: boolean
  readonly colour: string
}

export type PdfLine = {
  readonly x1: number
  readonly x2: number
  readonly y: number
  readonly colour: string
  readonly width: number
}

export type PdfSentence = {
  readonly y: number
  readonly fontSize: number
  readonly runs: readonly PdfRun[]
  // The line under the word under test. Null when the sentence does not contain the word.
  readonly underline: PdfLine | null
}

export type PdfPage = {
  readonly background: string
  readonly word: PdfText
  // A slide from schema version 1 has no sentence.
  readonly sentence: PdfSentence | null
}

const styleOf = (bold: boolean): FontStyle => (bold ? 'bold' : 'normal')

const sum = (values: readonly number[]): number => values.reduce((total, value) => total + value, 0)

// Put the parts of the sentence next to each other, with the full sentence in the centre of the page.
const layoutSentence = (measure: MeasureText, text: string, word: string): PdfSentence => {
  const parts = splitSentence(text, word)
  const unitWidths = parts.map((part) => measure(part.text, styleOf(part.isWord)))
  const unitWidth = sum(unitWidths)
  const fontSize = fitFontSize({ unitWidth, availableWidth: FILL * PDF_PAGE.width, maxSize: MAX_SENTENCE_FONT_SIZE })
  const y = PDF_PAGE.height * SENTENCE_Y
  const left = PDF_PAGE.width / 2 - (unitWidth * fontSize) / 2
  const starts = unitWidths.map((_, i) => left + sum(unitWidths.slice(0, i)) * fontSize)

  const runs = parts.map((part, i) => ({
    text: part.text,
    x: starts[i],
    bold: part.isWord,
    colour: part.isWord ? COLOURS.ink : COLOURS.inkSoft,
  }))

  const wordIndex = parts.findIndex((part) => part.isWord)
  const underline =
    wordIndex === -1
      ? null
      : {
          x1: starts[wordIndex],
          x2: starts[wordIndex] + unitWidths[wordIndex] * fontSize,
          y: y + fontSize * UNDERLINE_OFFSET,
          colour: COLOURS.primary,
          width: fontSize * UNDERLINE_WIDTH,
        }

  return { y, fontSize, runs, underline }
}

// Calculate the background, the positions, the font sizes and the colours of each page.
export const layoutPdf =
  (measure: MeasureText) =>
  (deck: Deck): readonly PdfPage[] =>
    deck.map(({ word, sentence }, index) => ({
      background: slideBackground(index),
      word: {
        text: word,
        x: PDF_PAGE.width / 2,
        y: PDF_PAGE.height * (sentence ? WORD_Y_WITH_SENTENCE : 0.5),
        fontSize: fitFontSize({
          unitWidth: measure(word, 'bold'),
          availableWidth: FILL * PDF_PAGE.width,
          maxSize: MAX_WORD_FONT_SIZE,
        }),
        colour: COLOURS.ink,
        bold: true,
      },
      sentence: sentence ? layoutSentence(measure, sentence.text, word) : null,
    }))

const ALIGN_CENTRE = { align: 'center', baseline: 'middle' } as const
const ALIGN_LEFT = { align: 'left', baseline: 'middle' } as const

// The jsPDF methods that drawPdf uses.
export type PdfWriter = {
  addPage: (format: [number, number], orientation: 'landscape') => unknown
  setFillColor: (colour: string) => unknown
  rect: (x: number, y: number, width: number, height: number, style: 'F') => unknown
  setFont: (family: string, style: FontStyle) => unknown
  setTextColor: (colour: string) => unknown
  setFontSize: (size: number) => unknown
  text: (text: string, x: number, y: number, options: typeof ALIGN_CENTRE | typeof ALIGN_LEFT) => unknown
  setDrawColor: (colour: string) => unknown
  setLineWidth: (width: number) => unknown
  line: (x1: number, y1: number, x2: number, y2: number) => unknown
}

// Draw the pages with the writer. The writer already has the first page.
export const drawPdf = (writer: PdfWriter, pages: readonly PdfPage[], font: string = PDF_FONT): void => {
  pages.forEach((page, i) => {
    if (i > 0) writer.addPage([PDF_PAGE.width, PDF_PAGE.height], 'landscape')

    writer.setFillColor(page.background)
    writer.rect(0, 0, PDF_PAGE.width, PDF_PAGE.height, 'F')

    const { word, sentence } = page
    writer.setFont(font, styleOf(word.bold))
    writer.setTextColor(word.colour)
    writer.setFontSize(word.fontSize)
    writer.text(word.text, word.x, word.y, ALIGN_CENTRE)

    if (!sentence) return
    writer.setFontSize(sentence.fontSize)
    sentence.runs.forEach((run) => {
      writer.setFont(font, styleOf(run.bold))
      writer.setTextColor(run.colour)
      writer.text(run.text, run.x, sentence.y, ALIGN_LEFT)
    })

    if (sentence.underline) {
      const { x1, x2, y, colour, width } = sentence.underline
      writer.setDrawColor(colour)
      writer.setLineWidth(width)
      writer.line(x1, y, x2, y)
    }
  })
}

// The static Playpen Sans files in public/fonts/playpen-sans. GitHub Pages serves them with the app.
const FONT_FILES: readonly { readonly file: string; readonly style: FontStyle }[] = [
  { file: 'PlaypenSans-Regular.ttf', style: 'normal' },
  { file: 'PlaypenSans-Bold.ttf', style: 'bold' },
]

const toBase64 = (bytes: Uint8Array): string => {
  const chunks: string[] = []
  // Convert in parts, because a very long argument list can stop String.fromCharCode.
  for (let i = 0; i < bytes.length; i += 32768) chunks.push(String.fromCharCode(...bytes.subarray(i, i + 32768)))
  return btoa(chunks.join(''))
}

type FontFile = {
  readonly file: string
  readonly style: FontStyle
  // The font file in base64, as jsPDF requires.
  readonly data: string
}

// Load the font files. Give null when a file does not load or is not a TrueType font.
// A server can answer with an HTML page and the status 200, so the check also reads the font signature.
const loadFontFiles = async (): Promise<readonly FontFile[] | null> => {
  try {
    return await Promise.all(
      FONT_FILES.map(async ({ file, style }) => {
        const response = await fetch(`${import.meta.env.BASE_URL}fonts/playpen-sans/${file}`)
        const bytes = new Uint8Array(await response.arrayBuffer())
        if (!response.ok || !isTrueTypeFont(bytes)) throw new Error(`The font file ${file} is not available`)
        return { file, style, data: toBase64(bytes) }
      }),
    )
  } catch {
    return null
  }
}

// Add the fonts to the document. Give false when jsPDF cannot use them, so that the download uses the fallback font.
const addFonts = (doc: InstanceType<typeof import('jspdf').jsPDF>, fonts: readonly FontFile[]): boolean => {
  try {
    fonts.forEach(({ file, style, data }) => {
      doc.addFileToVFS(file, data)
      doc.addFont(file, PDF_FONT, style)
    })
    doc.setFont(PDF_FONT, 'bold')
    doc.getStringUnitWidth('a')
    return true
  } catch {
    return false
  }
}

// The imperative shell: load jsPDF and the fonts, draw the deck, then download the file.
export const downloadPdf = async (deck: Deck): Promise<void> => {
  // Load jsPDF and the fonts only when necessary. This keeps the first download of the app small.
  const [{ jsPDF }, fonts] = await Promise.all([import('jspdf'), loadFontFiles()])
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [PDF_PAGE.width, PDF_PAGE.height] })

  // NN/g: prevent errors. If the fonts are not available, the download still operates with the fallback font.
  const font = fonts !== null && addFonts(doc, fonts) ? PDF_FONT : FALLBACK_FONT

  const measure: MeasureText = (text, style) => {
    doc.setFont(font, style)
    return doc.getStringUnitWidth(text)
  }
  drawPdf(doc, layoutPdf(measure)(deck), font)
  doc.save(PDF_FILE_NAME)
}
