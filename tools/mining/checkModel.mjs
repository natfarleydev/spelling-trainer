// A quick check that the fill-mask model loads and gives sensible guesses.
import { env, pipeline } from '@huggingface/transformers'

env.cacheDir = '../../.cache/models'
const started = Date.now()
const fill = await pipeline('fill-mask', 'Xenova/roberta-base', { dtype: 'q8' })
console.log('loaded in', Date.now() - started, 'ms')
const sentences = ['We eat <mask> when we are hungry.', 'Tom put the <mask> on the table.', 'The astronaut flew into <mask>.']
for (const sentence of sentences) {
  const t = Date.now()
  const guesses = await fill(sentence, { top_k: 8 })
  console.log(sentence, Date.now() - t, 'ms', JSON.stringify(guesses.map((g) => [g.token_str, Number(g.score.toFixed(3))])))
}
