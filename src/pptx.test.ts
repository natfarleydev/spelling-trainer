import { describe, expect, it } from 'vitest'
import { buildDeck, type Deck } from './deck'
import { drawPptx, layoutPptx, type PptxWriter } from './pptx'

const withSentences = (words: readonly string[]): Deck =>
  buildDeck(words, (word) => ({
    analysis: { type: 'other' },
    sentence: { template: 'The word is {word}.', text: `The word is ${word}.` },
  }))

describe('layoutPptx', () => {
  it('gives one slide for each word', () => {
    expect(layoutPptx(buildDeck(['because', 'friend']))).toHaveLength(2)
  })

  it('puts the word in the centre of the full slide when the slide has no sentence', () => {
    const [slide] = layoutPptx(buildDeck(['because']))
    expect(slide.word.text).toBe('because')
    expect(slide.word.options).toMatchObject({ x: 0, y: 0, w: '100%', h: '100%', align: 'center', valign: 'middle' })
    expect(slide.sentence).toBeNull()
  })

  it('puts the word in the top part and the sentence under it when the slide has a sentence', () => {
    const [slide] = layoutPptx(withSentences(['because']))
    expect(slide.word.options).toMatchObject({ x: 0, y: 0, w: '100%', h: '65%', align: 'center', valign: 'middle' })
    expect(slide.sentence?.text).toBe('The word is because.')
    expect(slide.sentence?.options).toMatchObject({ x: 0, y: '65%', w: '100%', h: '25%', align: 'center', valign: 'top' })
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
  it('adds one slide with the word and the sentence for each slide layout', () => {
    const calls: unknown[][] = []
    let slideNumber = 0
    const writer: PptxWriter = {
      addSlide: () => {
        slideNumber += 1
        const current = slideNumber
        return { addText: (...args) => calls.push([current, ...args]) }
      },
    }
    const slides = layoutPptx([...withSentences(['because']), ...buildDeck(['friend'])])

    drawPptx(writer, slides)

    expect(calls).toEqual([
      [1, 'because', slides[0].word.options],
      [1, 'The word is because.', slides[0].sentence!.options],
      [2, 'friend', slides[1].word.options],
    ])
  })
})
