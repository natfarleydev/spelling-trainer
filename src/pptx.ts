import type { Deck } from './deck'
import { estimateUnitWidth, fitFontSize } from './fontSize'
import { splitSentence } from './sentences/highlight'
import { COLOURS, slideBackground } from './theme/tokens'

export const PPTX_FILE_NAME = 'spelling-words.pptx'

// PptxGenJS cannot embed fonts. Windows and macOS install Comic Sans MS, and it has a single-storey "a" and "g".
export const PPTX_FONT = 'Comic Sans MS'

// The width of a LAYOUT_16x9 slide in points (10 inches).
const SLIDE_WIDTH = 720
const MAX_WORD_FONT_SIZE = 160
const MAX_SENTENCE_FONT_SIZE = 32
// The approximate width of one Comic Sans MS character, as a fraction of the font size.
const CHARACTER_WIDTH = 0.6
// A text fills a maximum of 85% of the slide width.
const FILL = 0.85

// A position or a size in points, or as a percentage of the slide.
type Coordinate = number | `${number}%`

export type PptxTextOptions = {
  readonly x: Coordinate
  readonly y: Coordinate
  readonly w: Coordinate
  readonly h: Coordinate
  readonly align: 'center'
  readonly valign: 'middle' | 'top'
  readonly fontFace: string
  readonly fontSize: number
  readonly color: string
  readonly bold?: boolean
}

export type PptxRunOptions = {
  readonly color: string
  readonly bold?: boolean
  readonly underline?: { readonly style: 'heavy'; readonly color: string }
}

// One part of the sentence, with its own format.
export type PptxRun = {
  readonly text: string
  readonly options: PptxRunOptions
}

export type PptxText = {
  readonly text: string
  readonly options: PptxTextOptions
}

export type PptxSentence = {
  readonly runs: readonly PptxRun[]
  readonly options: PptxTextOptions
}

export type PptxSlide = {
  // A hex colour without "#", as PptxGenJS requires.
  readonly background: string
  readonly word: PptxText
  // A slide from schema version 1 has no sentence.
  readonly sentence: PptxSentence | null
}

const withoutHash = (colour: string): string => colour.replace('#', '')

const fontSizeFor = (text: string, maxSize: number): number =>
  Math.floor(
    fitFontSize({
      unitWidth: estimateUnitWidth(text, CHARACTER_WIDTH),
      availableWidth: FILL * SLIDE_WIDTH,
      maxSize,
    }),
  )

// Give the sentence as text runs. The word under test is bold ink with a heavy primary underline.
const layoutSentence = (text: string, word: string): PptxSentence => ({
  runs: splitSentence(text, word).map((part) => ({
    text: part.text,
    options: part.isWord
      ? {
          color: withoutHash(COLOURS.ink),
          bold: true,
          underline: { style: 'heavy', color: withoutHash(COLOURS.primary) },
        }
      : { color: withoutHash(COLOURS.inkSoft) },
  })),
  options: {
    x: 0,
    y: '65%',
    w: '100%',
    h: '25%',
    align: 'center',
    valign: 'top',
    fontFace: PPTX_FONT,
    fontSize: fontSizeFor(text, MAX_SENTENCE_FONT_SIZE),
    color: withoutHash(COLOURS.inkSoft),
  },
})

// Calculate the background and the text options for each slide.
// When a slide has a sentence, the word fills the top 65% of the slide and the sentence is under it.
export const layoutPptx = (deck: Deck): readonly PptxSlide[] =>
  deck.map(({ word, sentence }, index) => ({
    background: withoutHash(slideBackground(index)),
    word: {
      text: word,
      options: {
        x: 0,
        y: 0,
        w: '100%',
        h: sentence ? '65%' : '100%',
        align: 'center',
        valign: 'middle',
        fontFace: PPTX_FONT,
        fontSize: fontSizeFor(word, MAX_WORD_FONT_SIZE),
        color: withoutHash(COLOURS.ink),
        bold: true,
      },
    },
    sentence: sentence ? layoutSentence(sentence.text, word) : null,
  }))

// The PptxGenJS methods that drawPptx uses. The run list is mutable, because the PptxGenJS type is mutable.
export type PptxWriter = {
  addSlide: (options: { background: { color: string } }) => {
    addText: (text: string | PptxRun[], options: PptxTextOptions) => unknown
  }
}

// Add one slide with its background and its texts for each slide layout.
export const drawPptx = (writer: PptxWriter, slides: readonly PptxSlide[]): void => {
  slides.forEach(({ background, word, sentence }) => {
    const slide = writer.addSlide({ background: { color: background } })
    slide.addText(word.text, word.options)
    if (sentence) slide.addText([...sentence.runs], sentence.options)
  })
}

// The imperative shell: load PptxGenJS, draw the deck, then download the file.
export const downloadPptx = async (deck: Deck): Promise<void> => {
  // Load PptxGenJS only when necessary. This keeps the first download of the app small.
  const { default: PptxGenJS } = await import('pptxgenjs')
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_16x9'
  // PptxGenJS 4 ignores a background in addSlide. It sets the background through a property of the slide.
  const writer: PptxWriter = {
    addSlide: ({ background }) => {
      const slide = pptx.addSlide()
      slide.background = { color: background.color }
      return slide
    },
  }
  drawPptx(writer, layoutPptx(deck))
  await pptx.writeFile({ fileName: PPTX_FILE_NAME })
}
