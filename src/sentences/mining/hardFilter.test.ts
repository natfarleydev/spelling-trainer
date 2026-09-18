import { describe, expect, it } from 'vitest'
import { BLOCKED_WORDS, hardFilterReason, NAMES, type FilterTools } from './hardFilter'

const KNOWN = new Set(['we', 'eat', 'when', 'are', 'hungry', 'likes', 'the', 'is', 'good', 'a', 'colour', 'and', 'with', 'my'])
const tools: FilterTools = { isKnown: (word) => KNOWN.has(word.toLowerCase()) }

describe('hardFilterReason', () => {
  it('passes a good sentence', () => {
    expect(hardFilterReason('We eat food when we are hungry.', 'food', tools)).toBeNull()
  })

  it.each([
    ['not a whole sentence', 'we eat food when we are hungry', 'food'],
    ['too short', 'We eat food.', 'food'],
    ['too long', 'We eat food when we are hungry and we eat food when we are hungry and hungry.', 'hungry'],
    ['no keyword', 'We eat when we are hungry.', 'food'],
    ['the keyword two times', 'We eat food when we are hungry for food.', 'food'],
    ['a number', 'We eat food when we are 9 and hungry.', 'food'],
    ['an apostrophe', 'We eat food when we’re hungry.', 'food'],
    ['a quotation mark', 'We eat "food" when we are hungry.', 'food'],
    ['an ellipsis', 'We eat food... when we are hungry.', 'food'],
    ['an unknown word', 'We eat food when we are ravenous.', 'food'],
    ['an American spelling', 'We eat food with a color.', 'food'],
    ['a blocked word', 'We eat food and beer when we are hungry.', 'food'],
  ])('rejects a sentence with %s', (_, sentence, word) => {
    const known = { isKnown: (other: string) => KNOWN.has(other.toLowerCase()) || ['beer', 'color', 'for'].includes(other) }
    expect(hardFilterReason(sentence, word, known)).not.toBeNull()
  })

  // A word of violence is not correct for a spelling test, and not correct in a sentence. Children read the slides.
  it.each(['violence', 'violent', 'victim', 'affair', 'abuse', 'breast'])('rejects a sentence with the word "%s"', (blocked) => {
    const known: FilterTools = { isKnown: () => true }
    expect(hardFilterReason(`We saw the ${blocked} thing in the town today.`, 'town', known)).not.toBeNull()
  })

  it('rejects a sentence with a form of a blocked word, through the base forms', () => {
    const withBases: FilterTools = {
      isKnown: () => true,
      bases: (word) => (word === 'murders' ? ['murder'] : []),
    }
    expect(hardFilterReason('We read about the murders in the town.', 'town', withBases)).not.toBeNull()
  })

  it('rejects a sentence with a form of an American word, through the base forms', () => {
    const withBases: FilterTools = {
      isKnown: () => true,
      bases: (word) => (word === 'movies' ? ['movie'] : []),
    }
    expect(hardFilterReason('I watch movies almost every day.', 'day', withBases)).not.toBeNull()
  })

  it.each([
    ['make love', 'I want to make love with you today.', 'today'],
    ['birth control', 'Do you use any method of birth control?', 'method'],
    ['life support', 'How many people are on life support?', 'people'],
    ['passed away', 'My old dog passed away last year.', 'dog'],
    ['fell in love', 'Tom fell in love with a woman at work.', 'woman'],
  ])('rejects a sentence with the blocked phrase %j', (_, sentence, keyword) => {
    expect(hardFilterReason(sentence, keyword, { isKnown: () => true })).not.toBeNull()
  })

  it('does not reject a sentence only because a blocked phrase word is in it alone', () => {
    expect(hardFilterReason('I love the control of my new bike.', 'bike', { isKnown: () => true })).toBeNull()
  })

  it.each(['cancer', 'attacked', 'criminal', 'youths', 'patients', 'pregnancy', 'abortion'])('rejects a sentence with the blocked word %j', (word) => {
    expect(hardFilterReason(`We talked about the ${word} at the table.`, 'table', { isKnown: () => true })).not.toBeNull()
  })

  it('accepts a name from the list of names', () => {
    expect(hardFilterReason('Tom likes the food when we are hungry.', 'food', tools)).toBeNull()
    expect(hardFilterReason('Muiriel likes the food when we are hungry.', 'food', tools)).not.toBeNull()
  })

  it('accepts the keyword in a different case', () => {
    expect(hardFilterReason('Food is good when we are hungry.', 'food', tools)).toBeNull()
  })
})

describe('the word lists', () => {
  it.each([
    ['NAMES', [...NAMES]],
    ['BLOCKED_WORDS', [...BLOCKED_WORDS]],
  ])('%s has each word one time', (_, words) => {
    expect(new Set(words.map((word) => word.toLowerCase())).size).toBe(words.length)
  })

  it('has names with a capital letter', () => {
    expect([...NAMES].filter((name) => !/^[A-Z][a-z]+$/.test(name))).toEqual([])
  })

  it('has blocked words in lowercase', () => {
    expect([...BLOCKED_WORDS].filter((word) => word !== word.toLowerCase())).toEqual([])
  })
})
