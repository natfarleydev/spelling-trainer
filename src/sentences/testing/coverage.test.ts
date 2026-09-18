import { describe, expect, it } from 'vitest'
import { coverageOf, MINIMUM_SENTENCES, renderCoverage, type WordSource } from './coverage'

// The coverage report tells a session which words still need bank sentences. WORD-COVERAGE.md holds the result.

const SOURCES: readonly WordSource[] = [
  { name: 'Days', description: 'The days of the week.', words: ['Monday', 'Tuesday'] },
  { name: 'Numbers', description: 'The numbers in words.', words: ['one', 'two', 'One'] },
]

const sentencesOf = (word: string): readonly string[] =>
  ({
    monday: ['a', 'b', 'c'],
    tuesday: ['a'],
    one: ['a', 'b', 'c', 'd'],
  })[word.toLowerCase()] ?? []

describe('coverageOf', () => {
  it(`counts a word as complete when it has ${MINIMUM_SENTENCES} sentences or more`, () => {
    const [days] = coverageOf(SOURCES, sentencesOf)
    expect(days).toEqual({
      name: 'Days',
      description: 'The days of the week.',
      total: 2,
      done: 1,
      words: [
        { word: 'Monday', sentences: 3 },
        { word: 'Tuesday', sentences: 1 },
      ],
    })
  })

  it('gives each word of a source one time, without regard to capital letters', () => {
    const [, numbers] = coverageOf(SOURCES, sentencesOf)
    expect(numbers.words.map(({ word }) => word)).toEqual(['one', 'two'])
    expect(numbers.total).toBe(2)
    expect(numbers.done).toBe(1)
  })
})

describe('renderCoverage', () => {
  const report = renderCoverage(coverageOf(SOURCES, sentencesOf))

  it('crosses off a word that has enough sentences', () => {
    expect(report).toContain('- [x] Monday (3)')
  })

  it('leaves the box of a word that needs more sentences empty', () => {
    expect(report).toContain('- [ ] Tuesday (1)')
    expect(report).toContain('- [ ] two (0)')
  })

  it('gives a summary line for each source', () => {
    expect(report).toContain('| Days | 2 | 1 | 1 |')
    expect(report).toContain('| Numbers | 2 | 1 | 1 |')
  })

  it('gives the name and the description of each source', () => {
    expect(report).toContain('## Days')
    expect(report).toContain('The days of the week.')
  })

  // A date or a commit id would change the file at each run, and then the check would always fail.
  it('gives the same text for the same input', () => {
    expect(renderCoverage(coverageOf(SOURCES, sentencesOf))).toBe(report)
  })
})
