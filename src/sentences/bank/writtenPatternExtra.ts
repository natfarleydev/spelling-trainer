import type { BankEntry } from '../bank'

// The last written sentences for the spelling pattern words. Our own work (CC0).
// The first part gives a third sentence to the words that have only 2, so that the teacher has a choice.
// The second part gives sentences to the rare words that Tatoeba does not cover, for example "intercity" and "prophesy".
// mergeEntries in src/sentences/bank.ts joins these sentences with the sentences of the same word in the other files.
export const WRITTEN_PATTERN_EXTRA_BANK: readonly BankEntry[] = [
  { word: 'honk', sentences: ['When the road is blocked, drivers honk and shout.'] },
  { word: 'notch', sentences: ['Move the belt to the next notch for a lower level.'] },
  { word: 'grander', sentences: ['Her plan was grander and more ambitious than mine.'] },
  { word: 'grandest', sentences: ['The grandest house in the street is also the nicest.'] },
  { word: 'freshest', sentences: ['The freshest fish has the best taste.'] },
  { word: 'rule', sentences: ['The rule of the school is like a law for everyone.'] },
  { word: 'hurt', sentences: ['It hurt so badly that I had to sit down.'] },
  { word: 'burst', sentences: ['The pipe burst suddenly and water went everywhere.'] },
  { word: 'chief', sentences: ['The chief is the head of the whole group.'] },
  { word: 'high', sentences: ['The shelf is too high, but the box is low.'] },
  { word: 'bear', sentences: ['A bear is much bigger than a big dog.'] },
  { word: 'phonics', sentences: ['We practise phonics every day to read new words.'] },
  { word: 'frisky', sentences: ['The frisky lamb jumps about and is never lazy.'] },
  { word: 'farmyard', sentences: ['A pig and a sheep live in the farmyard.'] },
  { word: 'bulge', sentences: ['The apple made a bulge in my pocket.'] },
  { word: 'gem', sentences: ['The ring holds one precious gem.'] },
  { word: 'nostril', sentences: ['Air goes in through each nostril of your nose.'] },
  { word: 'war', sentences: ['The war ended, and the two countries became friends.'] },
  { word: 'hopeless', sentences: ['Do not feel hopeless or sad, because tomorrow is a new day.'] },
  { word: 'myth', sentences: ['Is that story a myth, or is it true?'] },
  { word: 'scene', sentences: ['The last scene of the show happens at night.'] },
  { word: 'malicious', sentences: ['A malicious trick is unfair and not funny.'] },
  { word: 'borough', sentences: ['A borough is smaller than a city and bigger than a village.'] },
  {
    word: 'reappear',
    sentences: ['Wait here, and the sun will reappear after the cloud passes.', 'The moon will appear, hide, and then reappear again.'],
  },
  {
    word: 'intercity',
    sentences: ['The intercity train goes from one city to the next.', 'We paid the fare for the intercity bus.'],
  },
  {
    word: 'interrelated',
    sentences: ['These interrelated subjects all relate to the same idea.', 'Different subjects can be interrelated in interesting ways.'],
  },
  {
    word: 'superstar',
    sentences: ['The singer is a superstar, and everyone knows her songs.', 'The young player became a superstar and a hero to the fans.'],
  },
  {
    word: 'comically',
    sentences: ['He walked comically, with silly, wide steps.', 'She spoke comically, and her funny voice made us laugh.'],
  },
  {
    word: 'invasion',
    sentences: ['The invasion started a war between the two countries.', 'The people fought to stop the invasion of their land.'],
  },
  {
    word: 'confession',
    sentences: ['She wrote her confession in a letter to her mother.', 'His confession proved the innocence of his friend.'],
  },
  {
    word: 'expansion',
    sentences: ['The expansion of the school is a plan to add more rooms.', 'Heat causes the expansion of metal, an increase in its size.'],
  },
  { word: 'chalet', sentences: ['We stayed in a wooden chalet instead of a hotel.', 'The chalet has one bedroom and a warm fire.'] },
  {
    word: 'bawl',
    sentences: ['The baby will bawl and shout when she is hungry.', 'Do not bawl at me, because a shout does not help.'],
  },
  {
    word: 'observance',
    sentences: ['The observance of the holiday brings the family together.', 'A solemn observance marks the day every year.'],
  },
  {
    word: 'hesitancy',
    sentences: ['She answered with hesitancy, after a long pause.', 'Hesitancy is the same as hesitation, a wait before you act.'],
  },
  {
    word: 'toleration',
    sentences: ['Toleration means the same as tolerance for other people.', 'The school teaches toleration, decency and respect.'],
  },
  {
    word: 'tolerably',
    sentences: ['The day was tolerably warm, and the walk was enjoyable.', 'He plays tolerably well, and the sound is tolerable.'],
  },
  {
    word: 'preferring',
    sentences: ['Preferring tea to coffee, she always chooses tea.', 'Preferring the quiet, he chose to read rather than play.'],
  },
  {
    word: 'license',
    sentences: ['To license something means to give permission for it.', 'The city will license the new shop, and the owner gets a licence.'],
  },
  {
    word: 'prophesy',
    sentences: ['To prophesy means to say what will happen, like a prophecy.', 'The old man tried to prophesy the future, but his prophecy was wrong.'],
  },
]
