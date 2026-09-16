import type { BankEntry } from '../bank'

// Sentences for the CYP-LEX book words that do not have 3 good Tatoeba sentences. Our own work (CC0).
// The vetting of the first CYP-LEX batch (2026-09-16) found only idioms for some words, for example "sleep a wink",
// "get on my nerves" and "the top of his lungs". Each sentence here shows the meaning of the word.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_CYPLEX_BANK: readonly BankEntry[] = [
  {
    word: 'muffled',
    sentences: ['A muffled thump came from behind the door.', 'Her voice was muffled, and not loud at all.'],
  },
  { word: 'wink', sentences: ['He gave me a wink and a smile.'] },
  {
    word: 'mouthful',
    sentences: ['She took a big mouthful of the delicious cake.', 'One mouthful was enough, so he did not take another bite.'],
  },
  { word: 'nostrils', sentences: ['The two holes in your nose are your nostrils.'] },
  { word: 'lungs', sentences: ['Your lungs fill with air inside your chest.'] },
  { word: 'mass', sentences: ['A tiny cell has very little mass, but a big rock has a lot.'] },
  {
    word: 'proof',
    sentences: ['This photo is the proof that will prove I was there.', 'Without facts, you have no proof.'],
  },
  { word: 'daylight', sentences: ['We walked home in daylight, before the darkness came.'] },
  { word: 'spray', sentences: ['I spray water on the plants from a bottle.'] },
  { word: 'reflection', sentences: ['My reflection in the glass showed a surprised expression.'] },
  {
    word: 'eyebrow',
    sentences: ['He raised one eyebrow and gave a small smile.', 'A hair from my eyebrow fell onto my cheek.'],
  },
  { word: 'flap', sentences: ['The flap of the tent moved like a curtain in the wind.'] },
  { word: 'blur', sentences: ['Without my glasses the pattern was just a blur.', 'The fast car went past in a dark blur.'] },
  {
    word: 'nerves',
    sentences: ['Nerves carry messages from your finger to your brain.', 'Before the test I felt nervous, and my nerves were bad.'],
  },
]
