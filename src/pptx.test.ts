import { describe, expect, it } from 'vitest'
import { buildDeck, type Deck } from './deck'
import { drawPptx, layoutPptx, PPTX_FONT, type PptxWriter } from './pptx'

const withSentences = (words: readonly string[]): Deck =>
  buildDeck(words, (word) => ({
    analysis: { type: 'other' },
    sentence: { template: '', text: `The ${word} sat on the mat.` },
  }))

describe('layoutPptx', () => {
  it('gives one slide for each word', () => {
    expect(layoutPptx(buildDeck(['because', 'friend']))).toHaveLength(2)
  })

  it('gives each slide the slide background colour for its index, without "#"', () => {
    const slides = layoutPptx(buildDeck(['a', 'b', 'c', 'd', 'e', 'f']))
    expect(slides.map((slide) => slide.background)).toEqual(['FFF4D6', 'DDF0FF', 'DDF7EC', 'EDE6FF', 'FFE4DC', 'FFF4D6'])
  })

  it('uses Comic Sans MS, which Windows and macOS install and which has a single-storey "a" and "g"', () => {
    expect(PPTX_FONT).toBe('Comic Sans MS')
  })

  it('puts the bold word in ink in the centre of the full slide when the slide has no sentence', () => {
    const [slide] = layoutPptx(buildDeck(['because']))
    expect(slide.word.text).toBe('because')
    expect(slide.word.options).toMatchObject({
      x: 0,
      y: 0,
      w: '100%',
      h: '100%',
      align: 'center',
      valign: 'middle',
      bold: true,
      color: '1F2544',
      fontFace: PPTX_FONT,
    })
    expect(slide.sentence).toBeNull()
  })

  it('puts the word in the top part and the sentence under it when the slide has a sentence', () => {
    const [slide] = layoutPptx(withSentences(['cat']))
    expect(slide.word.options).toMatchObject({ x: 0, y: 0, w: '100%', h: '65%', align: 'center', valign: 'middle' })
    expect(slide.sentence?.options).toMatchObject({
      x: 0,
      y: '65%',
      w: '100%',
      h: '25%',
      align: 'center',
      valign: 'top',
      fontFace: PPTX_FONT,
    })
  })

  it('gives the sentence as text runs, with the word under test in bold ink and a heavy primary underline', () => {
    const [slide] = layoutPptx(withSentences(['cat']))
    expect(slide.sentence?.runs).toEqual([
      { text: 'The ', options: { color: '4A4F6A' } },
      { text: 'cat', options: { color: '1F2544', bold: true, underline: { style: 'heavy', color: '2657D4' } } },
      { text: ' sat on the mat.', options: { color: '4A4F6A' } },
    ])
  })

  it('gives whole-number font sizes', () => {
    const [slide] = layoutPptx(withSentences(['because']))
    expect(Number.isInteger(slide.word.options.fontSize)).toBe(true)
    expect(Number.isInteger(slide.sentence?.options.fontSize)).toBe(true)
  })

  it('makes the sentence smaller than the word', () => {
    const [slide] = layoutPptx(withSentences(['because']))
    expect(slide.sentence!.options.fontSize).toBeLessThan(slide.word.options.fontSize)
  })

  it('gives a smaller font size for a longer word', () => {
    const [short, long] = layoutPptx(buildDeck(['cat', 'accommodation']))
    expect(long.word.options.fontSize).toBeLessThan(short.word.options.fontSize)
  })
})

describe('drawPptx', () => {
  it('adds one slide with its background, the word and the sentence runs for each slide layout', () => {
    const calls: unknown[][] = []
    let slideNumber = 0
    const writer: PptxWriter = {
      addSlide: (options) => {
        slideNumber += 1
        const current = slideNumber
        calls.push([current, 'addSlide', options])
        return { addText: (text, options) => calls.push([current, 'addText', text, options]) }
      },
    }
    const slides = layoutPptx([...withSentences(['cat']), ...buildDeck(['dog'])])

    drawPptx(writer, slides)

    expect(calls).toEqual([
      [1, 'addSlide', { background: { color: 'FFF4D6' } }],
      [1, 'addText', 'cat', slides[0].word.options],
      [1, 'addText', slides[0].sentence!.runs, slides[0].sentence!.options],
      [2, 'addSlide', { background: { color: 'DDF0FF' } }],
      [2, 'addText', 'dog', slides[1].word.options],
    ])
  })
})
