import type { Deck } from './deck'
import { estimateUnitWidth, fitFontSize } from './fontSize'

export const PPTX_FILE_NAME = 'spelling-words.pptx'

// The width of a LAYOUT_16x9 slide in points (10 inches).
const SLIDE_WIDTH = 720
const MAX_FONT_SIZE = 160
// The approximate width of one Arial character, as a fraction of the font size.
const CHARACTER_WIDTH = 0.55
// The word fills a maximum of 85% of the slide width.
const FILL = 0.85

export type PptxTextOptions = {
  readonly x: number
  readonly y: number
  readonly w: '100%'
  readonly h: '100%'
  readonly align: 'center'
  readonly valign: 'middle'
  readonly fontFace: string
  readonly fontSize: number
}

export type PptxText = {
  readonly text: string
  readonly options: PptxTextOptions
}

// Calculate the text options for each slide.
export const layoutPptx = (deck: Deck): readonly PptxText[] =>
  deck.map(({ word }) => ({
    text: word,
    options: {
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
      align: 'center',
      valign: 'middle',
      fontFace: 'Arial',
      fontSize: Math.floor(
        fitFontSize({
          unitWidth: estimateUnitWidth(word, CHARACTER_WIDTH),
          availableWidth: FILL * SLIDE_WIDTH,
          maxSize: MAX_FONT_SIZE,
        }),
      ),
    },
  }))

// The PptxGenJS methods that drawPptx uses.
export type PptxWriter = {
  addSlide: () => { addText: (text: string, options: PptxTextOptions) => unknown }
}

// Add one slide with its text for each slide layout.
export const drawPptx = (writer: PptxWriter, slides: readonly PptxText[]): void => {
  slides.forEach(({ text, options }) => writer.addSlide().addText(text, options))
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
