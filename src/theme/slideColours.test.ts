import { describe, expect, it } from 'vitest'
import { SLIDE_COLOURS, slideColour } from './slideColours'

describe('slideColour', () => {
  it('gives the slide colours of the style guide in order', () => {
    expect([0, 1, 2, 3, 4].map(slideColour)).toEqual(['cream', 'sky', 'mint', 'lilac', 'peach'])
  })

  it('starts again after the last colour', () => {
    expect(slideColour(5)).toBe('cream')
    expect(slideColour(12)).toBe('mint')
  })

  it('gives a colour for a negative index', () => {
    expect(slideColour(-1)).toBe('peach')
  })

  it('has one colour for each slide background token', () => {
    expect(SLIDE_COLOURS).toEqual(['cream', 'sky', 'mint', 'lilac', 'peach'])
  })
})
