// The coverage report of the sentence bank. It tells a session which words still need sentences.
// scripts/writeCoverage.ts writes the result to WORD-COVERAGE.md, and coverageFile.test.ts keeps the file correct.
// These functions are pure, so the report is the same for the same bank. A date or a commit id would change the file
// at each run, so the report has neither.

export type WordSource = {
  readonly name: string
  readonly description: string
  readonly words: readonly string[]
}

export type WordState = {
  readonly word: string
  readonly sentences: number
}

export type SourceCoverage = {
  readonly name: string
  readonly description: string
  readonly total: number
  readonly done: number
  readonly words: readonly WordState[]
}

// The number of sentences that gives the teacher a choice when one sentence does not operate.
export const MINIMUM_SENTENCES = 3

export const REPORT_FILE = 'WORD-COVERAGE.md'

const uniqueWords = (words: readonly string[]): readonly string[] => {
  const seen = new Set<string>()
  return words.filter((word) => {
    const key = word.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export const coverageOf = (
  sources: readonly WordSource[],
  sentencesOf: (word: string) => readonly string[],
): readonly SourceCoverage[] =>
  sources.map(({ name, description, words }) => {
    const states = uniqueWords(words).map((word) => ({ word, sentences: sentencesOf(word).length }))
    return {
      name,
      description,
      total: states.length,
      done: states.filter(({ sentences }) => sentences >= MINIMUM_SENTENCES).length,
      words: states,
    }
  })

const NEWLINE = String.fromCharCode(10)

const summaryRow = ({ name, total, done }: SourceCoverage): string => `| ${name} | ${total} | ${done} | ${total - done} |`

const wordLine = ({ word, sentences }: WordState): string =>
  `- [${sentences >= MINIMUM_SENTENCES ? 'x' : ' '}] ${word} (${sentences})`

const section = ({ name, description, total, done, words }: SourceCoverage): string =>
  [
    `## ${name}`,
    '',
    description,
    '',
    `${done} of ${total} words have ${MINIMUM_SENTENCES} sentences or more.`,
    '',
    ...words.map(wordLine),
  ].join(NEWLINE)

export const renderCoverage = (coverage: readonly SourceCoverage[]): string => {
  const total = coverage.reduce((count, source) => count + source.total, 0)
  const done = coverage.reduce((count, source) => count + source.done, 0)
  return [
    '# Word coverage of the sentence bank',
    '',
    'This file is generated. Do not change it by hand.',
    'Run `npm run coverage` to make it again, or let the pre-commit hook do it.',
    '',
    `A word is crossed off when the bank has ${MINIMUM_SENTENCES} sentences or more for it.`,
    'The number after each word is the number of bank sentences.',
    '',
    `**${done} of ${total} words are complete. ${total - done} words still need sentences.**`,
    '',
    '| Word source | Words | With 3 sentences | Missing |',
    '| --- | --- | --- | --- |',
    ...coverage.map(summaryRow),
    '',
    ...coverage.map(section),
    '',
  ].join(NEWLINE)
}
