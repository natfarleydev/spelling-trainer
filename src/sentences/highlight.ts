export type SentencePart = {
  readonly text: string
  // True for the part that is the word under test.
  readonly isWord: boolean
}

const isLetter = (character: string | undefined): boolean => character !== undefined && /\p{L}/u.test(character)

// Split a sentence into parts, so that the slide can highlight the first whole-word match of the word under test.
// The match does not use regular expressions, so that the characters of the word have no special meaning.
export const splitSentence = (sentence: string, word: string): readonly SentencePart[] => {
  const target = word.trim().toLowerCase()
  if (target === '') return [{ text: sentence, isWord: false }]

  const lower = sentence.toLowerCase()
  for (let start = lower.indexOf(target); start !== -1; start = lower.indexOf(target, start + 1)) {
    const end = start + target.length
    if (!isLetter(sentence[start - 1]) && !isLetter(sentence[end])) {
      return [
        ...(start > 0 ? [{ text: sentence.slice(0, start), isWord: false }] : []),
        { text: sentence.slice(start, end), isWord: true },
        ...(end < sentence.length ? [{ text: sentence.slice(end), isWord: false }] : []),
      ]
    }
  }
  return [{ text: sentence, isWord: false }]
}
