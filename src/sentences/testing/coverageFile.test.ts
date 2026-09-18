import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { bankSentences } from '../bank'
import { coverageOf, REPORT_FILE, renderCoverage } from './coverage'
import { WORD_SOURCES } from './wordSources'

// WORD-COVERAGE.md must always show the state of the bank, so that a new session picks up the work from the
// repository. The pre-commit hook in .githooks writes the file again before each commit. This test finds a file that
// the hook did not write, for example after a merge or after a commit with --no-verify.

describe(REPORT_FILE, () => {
  it('shows the state of the bank now', () => {
    const expected = renderCoverage(coverageOf(WORD_SOURCES, bankSentences))
    const actual = readFileSync(new URL(`../../../${REPORT_FILE}`, import.meta.url), 'utf8')
    expect(actual, `${REPORT_FILE} is old. Run "npm run coverage".`).toBe(expected)
  })
})
