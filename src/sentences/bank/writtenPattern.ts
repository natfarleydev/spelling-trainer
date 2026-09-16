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
  { word: 'mane', sentences: ['The horse shook the long hair of its mane.'] },
  {
    word: 'rein',
    sentences: ['Pull the rein to reduce the speed of the horse.', 'Hold the rein and push gently to turn the horse.'],
  },
  {
    word: 'vicious',
    sentences: ['A vicious dog can be dangerous, so keep away from it.', 'The two boys had a vicious fight in the yard.'],
  },
  {
    word: 'malicious',
    sentences: ['It was malicious and unfair to hide her bag.', 'A malicious joke can hurt an innocent person.'],
  },
  {
    word: 'expectant',
    sentences: ['The expectant children were impatient for the show to start.', 'The expectant fans were impatient and could not keep still.'],
  },
  {
    word: 'hesitant',
    sentences: ['She was hesitant and wary about the deep water.', 'He felt hesitant, so he was cautious on the ice.'],
  },
  { word: 'substance', sentences: ['Glue is a thick substance, a little like a liquid.'] },
  {
    word: 'frequency',
    sentences: ['The frequency of the bus is higher than usual today.', 'A clock keeps a steady frequency all day.'],
  },
  {
    word: 'obedience',
    sentences: ['The dog learns obedience and will obey every order.', 'Obedience means you respect the rules and follow them.'],
  },
  {
    word: 'tolerable',
    sentences: ['The noise was tolerable, so it seemed reasonable to stay.', 'Waiting ten minutes is tolerable and quite understandable.'],
  },
  {
    word: 'legible',
    sentences: ['Your writing is legible, so I copied it easily.', 'Write in legible letters, and do not misspell a word.'],
  },
  {
    word: 'sensibly',
    sentences: ['She spent her money sensibly, as she ought to.', 'Dress sensibly for the cold, because a sensible coat helps.'],
  },
  {
    word: 'referral',
    sentences: ['The doctor gave the patient a referral to the hospital.', 'With a referral, you can get treatment more quickly.'],
  },
  { word: 'nought', sentences: ['Nought means zero, so the score was nought to one.', 'The final score was two goals to nought.'] },
  {
    word: 'borough',
    sentences: ['A borough is one part of a big city or town.', 'Our borough has its own school and library.'],
  },
  { word: 'plough', sentences: ['The farmer bought a plough to turn the soil.', 'He bought a plough and a cart for the farm.'] },
  { word: 'bough', sentences: ['A bough is a big branch of a pear tree.', 'The lamb rested under a low bough.'] },
  {
    word: 'solemn',
    sentences: ['The room was quiet and solemn, and nobody smiled.', 'We stood in solemn silence to show respect.'],
  },
  {
    word: 'thistle',
    sentences: ['A thistle is a wild plant, and its flower looks like a purple cup.', 'We put one thistle flower in a bowl of water.'],
  },
  {
    word: 'precede',
    sentences: ['A short pause will precede the start of the show.', 'The band will arrive early and precede the singers.'],
  },
  {
    word: 'stationary',
    sentences: ['The car was stationary, so its wheels did not turn.', 'A stationary bike stays in one place when you ride it.'],
  },
  {
    word: 'antiseptic',
    sentences: ['Put antiseptic on the cut to clean your skin.', 'Antiseptic is a liquid that cleans a cut.'],
  },
  {
    word: 'antisocial',
    sentences: ['Shouting in the library is rude and antisocial behaviour.', 'Antisocial behaviour upsets the people who live nearby.'],
  },
  {
    word: 'adoration',
    sentences: ['He watched his hero with adoration and admiration.', 'Adoration is a feeling of great love and happiness.'],
  },
  { word: 'comical', sentences: ['His silly hat looked comical and made us laugh.'] },
  { word: 'division', sentences: ['Our team plays in the second division of the league.'] },
  { word: 'enclosure', sentences: ['A wooden fence goes around the elephant enclosure.'] },
  {
    word: 'scene',
    sentences: ['The first scene of the show is in a garden.', 'In the last scene of the story, the friends meet again.'],
  },
  { word: 'crescent', sentences: ['The crescent moon was thin and bright in the sky.'] },
  {
    word: 'vein',
    sentences: ['Blood flows through a vein back to your heart.', 'You can see a blue vein under the skin of your arm.'],
  },
  { word: 'berry', sentences: ['A berry is a small, sweet fruit.', 'We picked a sweet berry from the plant.'] },
  {
    word: 'great',
    sentences: ['The film was great, and we all had a good time.', 'She did a great job, and everyone said it was good work.'],
  },
  { word: 'groan', sentences: ['He let out a groan, then a yawn, and went to bed.'] },
]
