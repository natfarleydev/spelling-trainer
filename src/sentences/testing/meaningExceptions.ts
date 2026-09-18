// The meaning rule of src/sentences/bank.test.ts measures the word vectors: a content word of the sentence must have a
// similarity of 0.40 or more with the word under test. The rule finds a weak sentence, but it cannot check a word
// whose word vector carries a meaning that a child does not use.
//
// The GloVe vectors come from news text and web text, so the strongest meaning of a word is the meaning of an adult.
// Example: "ruler" is 0.74 from "king" and 0.76 from "reign", but it is only 0.19 from "line". A sentence about a king
// would pass the rule and teach the wrong meaning to a child.
//
// Thus these words get an exception, and Claude reads each of their sentences. Keep this list short: add a word only
// when the sentence for the meaning of a child cannot pass the rule. Give the reason and the measured numbers.
export const MEANING_EXCEPTIONS: ReadonlyMap<string, string> = new Map([
  ['ruler', 'The vector is a king who rules a country (king 0.74), and not the thing that measures a line (line 0.19).'],
  ['trainers', 'The vector is a person who trains other people (coaches 0.67), and not the soft shoes for sport.'],
  ['tire', 'The vector is the American spelling of "tyre" (tires 0.84, wheels 0.74), and not the verb that makes you tired.'],
  ['wed', 'The vector is the short form of "Wednesday" (saturdays 0.47), and not the verb that means to marry.'],
])

// True when the meaning rule must check the sentences of the word.
export const needsMeaningCheck = (word: string): boolean => !MEANING_EXCEPTIONS.has(word.trim().toLowerCase())
