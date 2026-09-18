import nlp from 'compromise/three'
import { readFileSync } from 'node:fs'
import { bankSentences } from '../../src/sentences/bank'
import { isKnownWord } from '../../src/sentences/testing/knownWords'
import { decodeWordVectors } from '../../src/sentences/wordVectors'

const vectors = decodeWordVectors(new Uint8Array(readFileSync('../../public/data/word-vectors.bin')))
const rootOf = (w: string) => {
  const doc = nlp(w); doc.compute('root')
  return doc.json()[0]?.terms[0]?.root ?? w.toLowerCase()
}
const groups: Record<string, string[]> = {
  days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','weekend','today','tomorrow','yesterday'],
  months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  seasons: ['spring','summer','autumn','winter','season'],
  numbers: ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','twenty','hundred','thousand','first','second','third','fourth','fifth'],
  colours: ['red','blue','green','yellow','orange','purple','pink','brown','black','white','grey','gold','silver'],
  timeWords: ['morning','afternoon','evening','night','week','year','minute','hour','clock','birthday','holiday','Christmas','Easter'],
  school: ['teacher','pencil','rubber','ruler','playground','assembly','uniform','library','lesson','homework','register','headteacher'],
  family: ['mother','father','mum','dad','sister','brother','grandmother','grandfather','aunt','uncle','cousin','family','baby'],
  body: ['head','hand','foot','arm','leg','finger','eye','ear','nose','mouth','tooth','teeth','hair','knee','shoulder'],
  food: ['bread','butter','cheese','apple','banana','orange','potato','carrot','dinner','breakfast','lunch','sandwich','biscuit','chocolate','water','milk'],
  clothes: ['coat','shoe','sock','hat','shirt','trousers','jumper','dress','scarf','glove','boot'],
  animals: ['dog','cat','horse','sheep','cow','rabbit','bird','fish','mouse','elephant','lion','tiger','snake','spider','frog'],
  weather: ['rain','sun','snow','wind','cloud','storm','fog','frost','ice','thunder','lightning'],
  places: ['England','London','Scotland','Wales','Ireland','Britain','Europe'],
  homeThings: ['kitchen','bathroom','bedroom','garden','window','door','table','chair','bed','fridge','cooker','television','garage'],
}
for (const [name, words] of Object.entries(groups)) {
  const rows = words.map((w) => {
    const bank = bankSentences(w).length
    const known = isKnownWord(w, rootOf)
    const vector = vectors.vector(w.toLowerCase()) !== undefined
    return `${w}[${bank}${known ? 'K' : '-'}${vector ? 'V' : '-'}]`
  })
  console.log(`${name}: ${rows.join(' ')}`)
}
