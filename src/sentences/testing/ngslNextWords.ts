import { FUNCTION_WORDS } from '../functionWords'
import { BLOCKED_WORDS } from '../mining/hardFilter'
import { NGSL_WORDS } from '../ngsl'
import { AMERICAN_WORDS } from '../simpleWords'

// The NGSL words with the rank 1001 to 2000. The first 1000 NGSL words are complete, and these words are the next
// most common words of English. A teacher sets many of them, for example "blood", "invite", "truth" and "copy".
//
// The list leaves out three kinds of word:
// - a function word, for example "whom", because it has no meaning of its own;
// - an American spelling, for example "gotten", because the rule for British English does not allow it;
// - a word of BLOCKED_WORDS, for example "sex" or "alcohol", because children read the slides.
//
// BLOCKED_WORDS also removes some words that a teacher can set, for example "blood" and "attack". The bank already has
// sentences for a few of them. Look at the list again when a teacher asks for one of these words.
const START_RANK = 1000
const END_RANK = 2000

export const NGSL_NEXT_WORDS: readonly string[] = NGSL_WORDS.slice(START_RANK, END_RANK)
  .map((word) => word.toLowerCase())
  .filter((word) => !FUNCTION_WORDS.has(word) && !AMERICAN_WORDS.has(word) && !BLOCKED_WORDS.has(word))
