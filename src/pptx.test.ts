import { describe, expect, it } from 'vitest'
import { buildDeck } from './deck'
import { drawPptx, layoutPptx, type PptxWriter } from './pptx'

describe('layoutPptx', () => {
  it('gives one slide for each word', () => {
    expect(layoutPptx(buildDeck(['because', 'friend']))).toHaveLength(2)
  })

  it('puts the word in the center of the full slide', () => {
    const [slide] = layoutPptx(buildDeck(['because']))
    expect(slide.text).toBe('because')
    expect(slide.options).toMatchObject({ x: 0, y: 0, w: '100%', h: '100%', align: 'center', valign: 'middle' })
  })

  it('gives a whole-number font size', () => {
    const [slide] = layoutPptx(buildDeck(['because']))
    expect(Number.isInteger(slide.options.fontSize)).toBe(true)
  })

  it('gives a smaller font size for a longer word', () => {
    const [short, long] = layoutPptx(buildDeck(['cat', 'accommodation']))
    expect(long.options.fontSize).toBeLessThan(short.options.fontSize)
  })
})

describe('drawPptx', () => {
  it('adds one slide with the text for each slide layout', () => {
    const calls: unknown[][] = []
    const writer: PptxWriter = {
      addSlide: () => ({ addText: (...args) => calls.push(['addText', ...args]) }),
    }
    const slides = layoutPptx(buildDeck(['because', 'friend']))

    drawPptx(writer, slides)

    expect(calls).toEqual([
      ['addText', 'because', slides[0].options],
      ['addText', 'friend', slides[1].options],
    ])
  })
})
