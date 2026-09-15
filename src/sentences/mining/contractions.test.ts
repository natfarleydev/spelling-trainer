import { describe, expect, it } from 'vitest'
import { expandContractions } from './contractions'

describe('expandContractions', () => {
  it.each([
    ['I don’t like it.', 'I do not like it.'],
    ["I don't like it.", 'I do not like it.'],
    ["Don't run!", 'Do not run!'],
    ["We can't go.", 'We cannot go.'],
    ["Can't you see it.", null],
    ["She won't come.", 'She will not come.'],
    ["It isn't cold.", 'It is not cold.'],
    ["I'm happy.", 'I am happy.'],
    ["You're tall.", 'You are tall.'],
    ["We've finished.", 'We have finished.'],
    ["They'll come.", 'They will come.'],
    ["It's cold.", 'It is cold.'],
    ["He's tired.", 'He is tired.'],
    ["She's been here.", 'She has been here.'],
    ["That's my hat.", 'That is my hat.'],
    ["Let's play.", 'Let us play.'],
    ["I'd like some tea.", 'I would like some tea.'],
    ["I'd gone home.", 'I had gone home.'],
  ] as const)('expands %j to %j', (sentence, expected) => {
    expect(expandContractions(sentence)?.text ?? null).toBe(expected)
  })

  it('says when it changed the sentence', () => {
    expect(expandContractions("I don't know.")).toEqual({ text: 'I do not know.', changed: true })
    expect(expandContractions('I do not know.')).toEqual({ text: 'I do not know.', changed: false })
  })

  it.each([
    ['a possessive', "Tom's dog is big."],
    ['a question with a pronoun after the contraction', "Don't you like it?"],
    ['a word with an apostrophe that is not a contraction', 'It is five o’clock.'],
    ['a dialect form', "It ain't fair."],
  ])('rejects a sentence with %s', (_, sentence) => {
    expect(expandContractions(sentence)).toBeNull()
  })
})
