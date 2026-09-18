import { bankSentences } from '../../src/sentences/bank'
for (const w of process.argv.slice(2)) console.log(`${w}: ${bankSentences(w).map((s)=>JSON.stringify(s)).join(' | ')}`)
