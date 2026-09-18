import nlp from 'compromise/three'
import { readFileSync } from 'node:fs'
import { bankSentences } from '../../src/sentences/bank'
import { NUMBER_WORDS } from '../../src/sentences/testing/knownWords'
import { decodeWordVectors } from '../../src/sentences/wordVectors'
const vectors = decodeWordVectors(new Uint8Array(readFileSync('../../public/data/word-vectors.bin')))
console.log(NUMBER_WORDS.map((w) => `${w}[${bankSentences(w).length}${vectors.vector(w) ? 'V' : '-'}]`).join(' '))
const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const months = ['January','March','April','May','June','July','August','September','October','November','December']
const tag = (w: string) => { const d = nlp(w); d.compute('root'); return d.json()[0]?.terms[0]?.tags ?? [] }
for (const w of [...days, ...months]) console.log(`${w}: ${[...tag(w)].join(',')}`)
