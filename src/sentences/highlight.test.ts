import { describe, expect, it } from 'vitest'
import { splitSentence } from './highlight'

describe('splitSentence', () => {
  it('marks the word under test', () => {
    expect(splitSentence('The cat sat on the mat.', 'cat')).toEqual([
      { text: 'The ', isWord: false },
      { text: 'cat', isWord: true },
      { text: ' sat on the mat.', isWord: false },
    ])
  })

  it('finds the word without regard to capital letters, and keeps the letters of the sentence', () => {
    expect(splitSentence('February is cold.', 'february')).toEqual([
      { text: 'February', isWord: true },
      { text: ' is cold.', isWord: false },
    ])
  })

  it('marks only a whole word', () => {
    expect(splitSentence('The category has cats.', 'cat')).toEqual([{ text: 'The category has cats.', isWord: false }])
  })

  it('marks only the first match', () => {
    expect(splitSentence('cat and cat', 'cat')).toEqual([
      { text: 'cat', isWord: true },
      { text: ' and cat', isWord: false },
    ])
  })

  it('gives the full sentence when the word is not in it', () => {
    expect(splitSentence('The dog ran.', 'cat')).toEqual([{ text: 'The dog ran.', isWord: false }])
  })

  it('treats the characters of the word as text', () => {
    expect(splitSentence('I like a.b here.', 'a.b')).toEqual([
      { text: 'I like ', isWord: false },
      { text: 'a.b', isWord: true },
      { text: ' here.', isWord: false },
    ])
  })

  it('ignores the spaces around the word', () => {
    expect(splitSentence('The cat sat.', '  cat ')).toEqual([
      { text: 'The ', isWord: false },
      { text: 'cat', isWord: true },
      { text: ' sat.', isWord: false },
    ])
  })

  it('gives the full sentence for an empty word', () => {
    expect(splitSentence('The cat sat.', '')).toEqual([{ text: 'The cat sat.', isWord: false }])
  })
})
