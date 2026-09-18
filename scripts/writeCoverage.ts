// Write the coverage report of the sentence bank to WORD-COVERAGE.md.
// Run: npm run coverage. The pre-commit hook in .githooks also runs it.
//
// The report tells a session which words still need bank sentences, and it crosses off each word that has 3 sentences
// or more. src/sentences/testing/coverage.ts calculates the report. This script only reads the bank and writes the file.

import { writeFileSync } from 'node:fs'
import { bankSentences } from '../src/sentences/bank.ts'
import { coverageOf, renderCoverage, REPORT_FILE } from '../src/sentences/testing/coverage.ts'
import { WORD_SOURCES } from '../src/sentences/testing/wordSources.ts'

const report = renderCoverage(coverageOf(WORD_SOURCES, bankSentences))
writeFileSync(new URL(`../${REPORT_FILE}`, import.meta.url), report)
console.log(`${REPORT_FILE}: ${report.split(String.fromCharCode(10)).length} lines`)
