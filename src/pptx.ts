import type { Deck } from './deck'
import { estimateUnitWidth, fitFontSize } from './fontSize'

export const PPTX_FILE_NAME = 'spelling-words.pptx'

// The width of a LAYOUT_16x9 slide in points (10 inches).
const SLIDE_WIDTH = 720
const MAX_WORD_FONT_SIZE = 160
const MAX_SENTENCE_FONT_SIZE = 32
// The approximate width of one Arial character, as a fraction of the font size.
const CHARACTER_WIDTH = 0.55
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
}

export type PptxText = {
  readonly text: string
  readonly options: PptxTextOptions
}

export type PptxSlide = {
  readonly word: PptxText
  // A slide from schema version 1 has no sentence.
  readonly sentence: PptxText | null
}

const fontSizeFor = (text: string, maxSize: number): number =>
  Math.floor(
    fitFontSize({
      unitWidth: estimateUnitWidth(text, CHARACTER_WIDTH),
      availableWidth: FILL * SLIDE_WIDTH,
      maxSize,
    }),
  )

// Calculate the text options for each slide.
// When a slide has a sentence, the word fills the top 65% of the slide and the sentence is under it.
export const layoutPptx = (deck: Deck): readonly PptxSlide[] =>
  deck.map(({ word, sentence }) => ({
    word: {
      text: word,
      options: {
        x: 0,
        y: 0,
        w: '100%',
        h: sentence ? '65%' : '100%',
        align: 'center',
        valign: 'middle',
        fontFace: 'Arial',
        fontSize: fontSizeFor(word, MAX_WORD_FONT_SIZE),
      },
    },
    sentence: sentence
      ? {
          text: sentence.text,
          options: {
            x: 0,
            y: '65%',
            w: '100%',
            h: '25%',
            align: 'center',
            valign: 'top',
            fontFace: 'Arial',
            fontSize: fontSizeFor(sentence.text, MAX_SENTENCE_FONT_SIZE),
          },
        }
      : null,
  }))

// The PptxGenJS methods that drawPptx uses.
export type PptxWriter = {
  addSlide: () => { addText: (text: string, options: PptxTextOptions) => unknown }
}

// Add one slide with its texts for each slide layout.
export const drawPptx = (writer: PptxWriter, slides: readonly PptxSlide[]): void => {
  slides.forEach(({ word, sentence }) => {
    const slide = writer.addSlide()
    slide.addText(word.text, word.options)
    if (sentence) slide.addText(sentence.text, sentence.options)
  })
}

// The imperative shell: load PptxGenJS, draw the deck, then download the file.
export const downloadPptx = async (deck: Deck): Promise<void> => {
  // Load PptxGenJS only when necessary. This keeps the first download of the app small.
  const { default: PptxGenJS } = await import('pptxgenjs')
  const pptx = new PptxGenJS()
  pptx.layout = 'LAYOUT_16x9'
  drawPptx(pptx, layoutPptx(deck))
  await pptx.writeFile({ fileName: PPTX_FILE_NAME })
}
