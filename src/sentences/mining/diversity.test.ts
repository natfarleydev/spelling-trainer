import { describe, expect, it } from 'vitest'
import { pickDiverse, trigramOverlap } from './diversity'

const items = (...texts: string[]) => texts.map((text) => ({ text }))

describe('trigramOverlap', () => {
  it('gives the share of the three-word sequences of the shorter sentence that are also in the other sentence', () => {
    // The shorter sentence has 8 three-word sequences. 6 of them are also in the longer sentence.
    expect(trigramOverlap('If I had enough money, I would buy that nice car.', 'If I had enough money, I would buy the book.')).toBeCloseTo(
      6 / 8,
    )
  })

  it('gives 0 for sentences with no shared three-word sequence', () => {
    expect(trigramOverlap('We went to the park to play.', 'Which game shall we play next?')).toBe(0)
  })

  it('does not see a difference between names', () => {
    expect(trigramOverlap('Tom went to the park.', 'Mary went to the park.')).toBe(1)
  })

  it('gives 0 when a sentence has fewer than three words', () => {
    expect(trigramOverlap('Go now.', 'Go now.')).toBe(0)
  })
})

describe('pickDiverse', () => {
  it('keeps the order and gives a maximum of the count', () => {
    expect(pickDiverse(items('We went to the park to play.', 'Which game shall we play next?', 'I like to play with my dog.'), 2)).toEqual(
      items('We went to the park to play.', 'Which game shall we play next?'),
    )
  })

  it('skips a sentence that is almost the same as a sentence that it already picked', () => {
    expect(
      pickDiverse(
        items(
          'If I had enough money, I would buy that nice car.',
          'If I had enough money, I would buy the book.',
          'How much money did you spend?',
        ),
        3,
      ),
    ).toEqual(items('If I had enough money, I would buy that nice car.', 'How much money did you spend?'))
  })

  it('skips a sentence that shares a long phrase with a picked sentence', () => {
    expect(pickDiverse(items('How can I get to the station?', 'Could you tell me how to get to the station?'), 2)).toEqual(
      items('How can I get to the station?'),
    )
  })
})
