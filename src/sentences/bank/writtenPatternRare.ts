import type { BankEntry } from '../bank'

// Sentences for the rare spelling pattern words that Tatoeba does not cover. Our own work (CC0).
// These words come from the suffix and prefix lists of English Appendix 1, for example "plainness", "subdivide" and
// "applicably". Tatoeba has few sentences for them, and the sentences that it has are for adults.
// The word vector of a rare word is near its own word family, and not near the plain word for the meaning. Example:
// "copier" is near "printer", and not near "copy". Thus a sentence here gives a word of the same family as the clue.
// src/sentences/bank.test.ts checks the rules.
export const WRITTEN_PATTERN_RARE_BANK: readonly BankEntry[] = [
  {
    word: 'plainness',
    sentences: [
      'The plainness of his words showed honesty, and he hid nothing.',
      'Her plainness and kindness made her a good friend.',
      'The plainness of her clothes hid the goodness of her heart.',
    ],
  },
  {
    word: 'subdivide',
    sentences: [
      'We subdivide the field, and the subdivided parts become small gardens.',
      'First we construct the wall, and then we subdivide the room.',
      'If the groups are too big, subdivide them and modify the plan.',
    ],
  },
  {
    word: 'subheading',
    sentences: [
      'A subheading is a small title above a paragraph.',
      'Each paragraph in my report has a subheading.',
      'Write a subheading, and then write the paragraph under it.',
    ],
  },
  {
    word: 'submerge',
    sentences: [
      'The heavy stone will submerge and sink to the bottom.',
      'When the river rises, it will submerge the flooded field.',
      'If you submerge the toy boat, it will sink and disappear.',
    ],
  },
  {
    word: 'nobly',
    sentences: [
      'The knight behaved nobly, and he helped the poor.',
      'She acted nobly and wisely, and she thought of others first.',
      'He gave up his seat nobly, and he behaved very well.',
    ],
  },
  {
    word: 'applicably',
    sentences: [
      'We used the rule applicably, and it applies to every child.',
      'The teacher wrote the rule applicably, so we can apply it at home.',
      'Applicably means in a way that can apply to a thing.',
    ],
  },
  {
    word: 'forcible',
    sentences: [
      'A forcible move is not voluntary, because somebody makes you do it.',
      'The gate was resisting us, so a forcible push opened it.',
      'A forcible rule is a restriction, and force keeps you out.',
    ],
  },
  {
    word: 'transference',
    sentences: [
      'The transference of heat needs a careful measurement.',
      'Transference of the light gives a reflection in the glass.',
      'The transference of his attachment to the new pet surprised us.',
    ],
  },
  { word: 'cell', sentences: ['Blood has red cells, and each cell is much too small to see.'] },
  { word: 'merriment', sentences: ['The game brought merriment, and the laughter went on all day.'] },
  { word: 'limiting', sentences: ['Limiting the time on the computer to one hour is a fair limit.'] },
  { word: 'limitation', sentences: ['The rule has one limitation, because it limits us to two sweets.'] },
  { word: 'reappear', sentences: ['The rabbit will disappear and then reappear from the hat.'] },
  { word: 'intercity', sentences: ['An intercity road joins one city to another city.'] },
  { word: 'interrelated', sentences: ['The two topics are interrelated, because each one helps to explain the other.'] },
  { word: 'superstar', sentences: ['A superstar is a famous star who is known by everyone.'] },
  { word: 'comically', sentences: ['The funny man fell comically, and all the children laughed.'] },
  { word: 'invasion', sentences: ['The invasion of the castle failed, and the army went home.'] },
  { word: 'confession', sentences: ['After his confession, everyone knew the truth, and he said sorry.'] },
  { word: 'expansion', sentences: ['The expansion of the town added many new houses.'] },
  { word: 'chalet', sentences: ['A chalet is a wooden house where people stay to ski.'] },
  { word: 'vein', sentences: ['The nurse found a vein in my arm for the blood test.'] },
  { word: 'bawl', sentences: ['Do not bawl or shriek in the library, and use a whisper.'] },
  { word: 'rein', sentences: ['The rider holds a rein in each hand to turn the horse.'] },
  { word: 'observance', sentences: ['The observance of the rules means that we observe them carefully.'] },
  { word: 'expectant', sentences: ['The expectant parents waited for their new baby.'] },
  { word: 'hesitancy', sentences: ['His hesitancy showed his doubts about the plan.'] },
  { word: 'toleration', sentences: ['Toleration means respecting the beliefs of other people.'] },
  { word: 'tolerable', sentences: ['The cold water was tolerable, and a short swim was acceptable.'] },
  { word: 'tolerably', sentences: ['The old car runs tolerably well, and it is reliable.'] },
  { word: 'referral', sentences: ['The referral sent the patient to a different doctor.'] },
  { word: 'preferring', sentences: ['Preferring to walk, he will choose the path and not the bus.'] },
  { word: 'thistle', sentences: ['Bees visit the purple flower of a thistle in the field.'] },
  { word: 'license', sentences: ['The council will license the market, and each seller gets a licence.'] },
  { word: 'prophesy', sentences: ['Nobody can prophesy the future, and no prophecy is certain.'] },
  { word: 'precede', sentences: ['The guests who arrive early precede the others.'] },
  { word: 'stationary', sentences: ['The traffic was stationary, and no car could move.'] },
]
