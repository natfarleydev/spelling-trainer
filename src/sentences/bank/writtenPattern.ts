import type { BankEntry } from '../bank'

// Sentences for spelling-pattern words that do not have 3 good Tatoeba sentences. Our own work (CC0).
// The vetting of the pattern words (2026-09-16) found only idioms for some words, for example "take it down a notch",
// "bear with me" or "high school". Each sentence here shows the meaning of the word. src/sentences/bank.test.ts checks the rules.
export const WRITTEN_PATTERN_BANK: readonly BankEntry[] = [
  { word: 'buzz', sentences: ['The bees buzz around the flowers in the sun.', 'I can hear a fly buzz near the window.'] },
  { word: 'catches', sentences: ['She catches the ball with both hands.'] },
  { word: 'hunted', sentences: ['The cat hunted a mouse in the long grass.'] },
  { word: 'under', sentences: ['The cat sleeps under my bed.'] },
  { word: 'dare', sentences: ['I did not dare to look down from the tall tree.'] },
  {
    word: 'hutch',
    sentences: ['The frisky rabbit ran into its little hutch.', 'We clean the hutch where the frisky rabbit sleeps.'],
  },
  {
    word: 'honk',
    sentences: ['Cars honk with a loud noise when the road is blocked.', 'The driver gave a loud honk to warn us.'],
  },
  {
    word: 'notch',
    sentences: ['Cut a small notch in the stick with a knife.', 'Cut a notch in the edge of the wood to mark it.'],
  },
  {
    word: 'grander',
    sentences: ['The enormous palace is grander than our little house.', 'This hall is grander and nicer than the old one.'],
  },
  {
    word: 'grandest',
    sentences: ['This is the nicest and grandest hotel in the city.', 'The grandest building of all was the famous pyramid.'],
  },
  {
    word: 'freshest',
    sentences: ['This fruit is the freshest and most delicious in the shop.', 'The freshest bread has the best smell and taste.'],
  },
  {
    word: 'rule',
    sentences: ['The first rule of the game is to be fair.', 'A rule tells you what you can and cannot do.'],
  },
  { word: 'hurt', sentences: ['I fell over and hurt my knee.', 'It hurt badly when I fell on my arm.'] },
  { word: 'burst', sentences: ['The balloon burst with a loud noise.', 'The bag was so full that it burst open.'] },
  { word: 'chief', sentences: ['Rain is the chief reason we stayed at home.', 'The chief cook decides what the kitchen makes.'] },
  { word: 'high', sentences: ['The wall is too high for me to climb.', 'The plane flew high above the clouds.'] },
  {
    word: 'bear',
    sentences: ['A bear is a big animal with thick black hair.', 'A big black bear walked slowly through the trees.'],
  },
  {
    word: 'phonics',
    sentences: ['In phonics we teach the sound of each letter.', 'Phonics helps us practise the letters of the alphabet.'],
  },
  { word: 'frisky', sentences: ['The frisky dog is playful and never lazy.', 'The frisky puppy is silly and full of fun.'] },
  {
    word: 'farmyard',
    sentences: ['The farmyard was full of hens and pigs.', 'We fed the sheep and the pig in the farmyard.'],
  },
  {
    word: 'blackberry',
    sentences: ['A blackberry is a dark fruit, smaller than an apple.', 'We picked a blackberry and an apple from the garden.'],
  },
  { word: 'dodge', sentences: ['On his bike he can dodge past the slow cars.'] },
  { word: 'giraffe', sentences: ['A giraffe is taller than an elephant and eats leaves from trees.'] },
  {
    word: 'bulge',
    sentences: ['The ball made a big bulge in his coat pocket.', 'A bulge in the pocket showed where the keys were.'],
  },
  {
    word: 'gem',
    sentences: ['A gem is a precious stone in a gold ring.', 'The queen keeps her gem with the rest of her treasure.'],
  },
  {
    word: 'cell',
    sentences: ['A cell is the smallest living part of the brain or the heart.', 'Every cell in your heart is far too small to see.'],
  },
  { word: 'gnat', sentences: ['A gnat is a tiny fly, smaller than a worm.', 'The bird ate a gnat and then a worm.'] },
  {
    word: 'gnaw',
    sentences: ['The mouse will gnaw the wood and crawl into the hole.', 'The dog will gnaw the bone, then yawn and sleep.'],
  },
  {
    word: 'wrong',
    sentences: ['I got the answer wrong, so I had to guess again.', 'I was sure my answer was right, but it was wrong.'],
  },
  { word: 'tinsel', sentences: ['We hung shiny tinsel on the tree.', 'The pink tinsel looks shiny on the wall.'] },
  { word: 'fossil', sentences: ['The fossil shows the bones of a dinosaur from long ago.'] },
  {
    word: 'nostril',
    sentences: ['A nostril is one of the two holes in your nose.', 'When my nose is runny, I hold one nostril shut.'],
  },
  {
    word: 'hiker',
    sentences: ['A hiker is a person who enjoys hiking in the hills.', 'Even a beginner can be a good hiker with strong boots.'],
  },
  { word: 'dropped', sentences: ['I dropped my glass and it fell down and broke.'] },
  {
    word: 'sadder',
    sentences: ['The song was sad, but the next one was sadder.', 'Rain makes the day sadder, and sun makes it happier.'],
  },
  {
    word: 'fattest',
    sentences: ['That pig is fatter than the others, but this one is the fattest.', 'The nicest cat in the house is also the fattest.'],
  },
  { word: 'chimney', sentences: ['Smoke comes out of the chimney on the roof.'] },
  {
    word: 'war',
    sentences: ['In a war, two countries fight each other.', 'Many people want to end the war and stop the fighting.'],
  },
  {
    word: 'hopeless',
    sentences: ['We felt sad and hopeless after we lost every game.', 'She was unhappy and hopeless until her friend helped her.'],
  },
  {
    word: 'merriment',
    sentences: ['The music brought merriment and enjoyment to everyone.', 'There was merriment and laughter, with no sadness at all.'],
  },
  { word: 'plentiful', sentences: ['Water is plentiful after the heavy rain.', 'Fruit is plentiful in summer, and there is enough for all.'] },
  {
    word: 'limiting',
    sentences: ['The rule is limiting us to one hour, and that limit is fair.', 'Limiting the noise helps, so keep it under the limit.'],
  },
  {
    word: 'limitation',
    sentences: ['One limitation of the plan is the limit on time.', 'A limitation is something that limits what you can do.'],
  },
  {
    word: 'myth',
    sentences: ['A myth is an old story that may not be true.', 'The old myth of the giant is fiction, not fact.'],
  },
  { word: 'misspell', sentences: ['It can annoy the teacher when you misspell a name.'] },
  {
    word: 'imperfect',
    sentences: ['It is sensible to know that every person is imperfect.', 'A perfect plan is impossible, so my plan is imperfect.'],
  },
]
