import type { BankEntry } from '../bank'

// Sentences for the last CYP-LEX book words. Our own work (CC0).
// The vetting of the Tatoeba candidates (2026-09-16) left these words out, because the candidates were about romance,
// an adult place or the American meaning. Example: the candidates for "chips" were about a computer chip, and the
// candidates for "strip" were about a war. Each sentence here shows the meaning that a child meets in a book.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_CYPLEX_EXTRA_BANK: readonly BankEntry[] = [
  {
    word: 'term',
    sentences: [
      'The term for a young dog is the word puppy, for example.',
      'In the summer term we change to a new subject at school.',
      'A long term plan means many years in the future.',
    ],
  },
  {
    word: 'brow',
    sentences: [
      'Your brow is the skin above your eyebrow.',
      'She wiped her brow with a clean handkerchief.',
      'His brow was wet, and a drop ran down his cheek.',
    ],
  },
  {
    word: 'beloved',
    sentences: [
      'Her beloved grandmother is the person she loves most.',
      'The beloved hero was loved by everyone in the town.',
      'My beloved dog is my best friend, and I love him.',
    ],
  },
  {
    word: 'chips',
    sentences: [
      'I ate every chip, because hot chips are my favourite snack.',
      'Chips are cut from a potato and cooked until they are hot.',
      'We had chips with our dinner, and they were a tasty snack.',
    ],
  },
  {
    word: 'strip',
    sentences: [
      'A strip of grass grows along the fence at the border of the field.',
      'We cut a long strip of paper to cover the inside of the box.',
      'The narrow strip of land runs along the edge of the area.',
    ],
  },
  {
    word: 'puff',
    sentences: [
      'A puff of smoke came from the hot fire.',
      'She ate a cream puff, a cake with soft cream inside.',
      'One puff of wind moved the fluffy cloud.',
    ],
  },
  {
    word: 'flick',
    sentences: [
      'With a flick of his hand the magician made a rabbit appear.',
      'A flick of the tail is a quick twist, and not a kick.',
      'He gave the ball a flick with his foot, and not a hard kick.',
    ],
  },
  {
    word: 'mound',
    sentences: [
      'The dog dug a hole and made a mound of earth beside it.',
      'A mound of sand grew on the beach beside the pond.',
      'The stone mound on the hill is higher than the field.',
    ],
  },
  {
    word: 'pointy',
    sentences: [
      'The cat has pointy ears and a wet nose.',
      'The pointy hats have a sharp top, like a mountain.',
      'The pointy teeth of the dog are very sharp.',
    ],
  },
  {
    word: 'twitching',
    sentences: [
      'The rabbit sat still, with only its nose twitching.',
      'My leg kept twitching, because the muscles were tired.',
      'His eyelids were twitching, and he could not keep them still.',
    ],
  },
  {
    word: 'cloak',
    sentences: [
      'The king wears a long cloak over his shoulders.',
      'A cloak is like a coat with no sleeves.',
      'She wrapped the cloak and the scarf around her.',
    ],
  },
  { word: 'blur', sentences: ['The fast train went past in a blur of colour.'] },
  { word: 'nerves', sentences: ['The nerves in your hand tell your brain about pain.'] },
]
