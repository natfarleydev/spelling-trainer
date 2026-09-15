// The maximum number of words in one presentation.
export const MAX_WORDS = 10

// Make a list of words from the text. Each line gives one word.
// Remove the spaces at the start and at the end of each line.
// Ignore the empty lines.
export const parseWords = (text: string): string[] =>
  text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

// The list is correct when it has a minimum of 1 word and a maximum of MAX_WORDS.
export const isValidWordList = (words: readonly string[]): boolean =>
  words.length > 0 && words.length <= MAX_WORDS

// Give the message that shows the number of words.
export const wordCountMessage = (count: number): string =>
  count > MAX_WORDS
    ? `${count} of ${MAX_WORDS} words. Remove ${count - MAX_WORDS}.`
    : `${count} of ${MAX_WORDS} words`
