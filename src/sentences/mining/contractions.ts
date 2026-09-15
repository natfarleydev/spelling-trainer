// Expand the contractions in a Tatoeba sentence, because a word with an apostrophe is more difficult to read.
// Example: "I don't know." gives "I do not know." The function gives null when it cannot expand the sentence safely,
// for example for a possessive ("Tom's dog") or a question ("Don't you like it?").

export type Expansion = {
  readonly text: string
  // True when the function changed the sentence. The provenance of a changed Tatoeba sentence records the change.
  readonly changed: boolean
}

const WORD_WITH_APOSTROPHE = /^([^\p{L}]*)(\p{L}+'\p{L}+)([^\p{L}]*)$/u

// A contraction before one of these words is usually a question. Its expansion is not correct English.
const PRONOUNS = new Set(['i', 'you', 'we', 'they', 'he', 'she', 'it'])

// After "'s" or "'d", these words show the meaning "has" or "had".
const PARTICIPLES = new Set(['been', 'got', 'gone', 'done', 'had', 'seen', 'made', 'taken', 'given', 'never'])

// "'s" means "is" or "has" only after these words. After other words, it is a possessive.
const S_BASES = new Set(['it', 'he', 'she', 'that', 'there', 'what', 'who', 'where', 'here', 'how'])

const IRREGULAR: Readonly<Record<string, { readonly expansion: string; readonly negative: boolean }>> = {
  "can't": { expansion: 'cannot', negative: true },
  "won't": { expansion: 'will not', negative: true },
  "shan't": { expansion: 'shall not', negative: true },
  "let's": { expansion: 'let us', negative: false },
}

const withCaseOf = (original: string, expansion: string): string =>
  original[0] === original[0].toUpperCase() ? expansion[0].toUpperCase() + expansion.slice(1) : expansion

const bareWord = (token: string | undefined): string => (token ?? '').replace(/[^\p{L}]/gu, '').toLowerCase()

// Give the expansion of one word with an apostrophe, or null when there is no safe expansion.
const expandWord = (word: string, next: string): string | null => {
  const lower = word.toLowerCase()
  const irregular = IRREGULAR[lower]
  if (irregular) return irregular.negative && PRONOUNS.has(next) ? null : withCaseOf(word, irregular.expansion)

  const apostrophe = word.indexOf("'")
  const base = word.slice(0, apostrophe)
  const suffix = lower.slice(apostrophe + 1)
  switch (suffix) {
    case 't':
      if (!base.toLowerCase().endsWith('n') || base.toLowerCase() === 'ain' || PRONOUNS.has(next)) return null
      return `${base.slice(0, -1)} not`
    case 'm':
      return base.toLowerCase() === 'i' ? `${base} am` : null
    case 're':
      return `${base} are`
    case 've':
      return `${base} have`
    case 'll':
      return `${base} will`
    case 'd':
      // "You'd better" means "you had better".
      return `${base} ${PARTICIPLES.has(next) || next.endsWith('ed') || next === 'better' ? 'had' : 'would'}`
    case 's':
      return S_BASES.has(base.toLowerCase()) ? `${base} ${PARTICIPLES.has(next) ? 'has' : 'is'}` : null
    default:
      return null
  }
}

export const expandContractions = (sentence: string): Expansion | null => {
  const tokens = sentence.replace(/[’‘]/g, "'").split(' ')
  let changed = false
  const expanded: string[] = []
  for (const [index, token] of tokens.entries()) {
    const match = WORD_WITH_APOSTROPHE.exec(token)
    if (!match) {
      expanded.push(token)
      continue
    }
    const [, before, word, after] = match
    const expansion = expandWord(word, bareWord(tokens[index + 1]))
    if (expansion === null) return null
    expanded.push(`${before}${expansion}${after}`)
    changed = true
  }
  const text = expanded.join(' ')
  return text.includes("'") ? null : { text, changed }
}
