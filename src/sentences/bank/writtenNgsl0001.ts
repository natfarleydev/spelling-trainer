import type { BankEntry } from '../bank'

// Sentences for the first 1000 NGSL words. Our own work (CC0).
// The NGSL words are the most common English words, so a teacher can set any of them as a spelling word. This file has
// the first batch, in the order of the NGSL rank: the most common words first.
// We write these sentences, because the Tatoeba download was not available. Each sentence shows one meaning with a
// clue word that a child knows. src/sentences/bank.test.ts checks the rules.
export const WRITTEN_NGSL_0001_BANK: readonly BankEntry[] = [
  {
    word: 'get',
    sentences: [
      'I get a letter from my friend every week.',
      'Get your coat, and then we can go outside.',
      'If you run, you will get there before me.',
    ],
  },
  {
    word: 'make',
    sentences: [
      'We make a cake with eggs and milk.',
      'Make your bed before you go to school.',
      'The hot sun will make the wet ground dry.',
    ],
  },
  {
    word: 'see',
    sentences: [
      'I can see the sea from my window.',
      'Look up, and you will see the stars.',
      'My eyes are weak, so I cannot see the board.',
    ],
  },
  {
    word: 'just',
    sentences: [
      'I just finished my work, and I did it a minute ago.',
      'There is just one apple left, and no more.',
      'That answer is just right, and it is not wrong.',
    ],
  },
  {
    word: 'look',
    sentences: ['Look at the picture on the wall.', 'Look for your shoes under the bed.', 'You look happy today, and your smile is big.'],
  },
  {
    word: 'thing',
    sentences: ['A cup is a thing that holds a drink.', 'What is that thing on the table?', 'The best thing about the trip was the beach.'],
  },
  {
    word: 'need',
    sentences: [
      'Plants need water and light to grow.',
      'I need a pen, because I cannot write without one.',
      'You do not need a coat, because it is warm.',
    ],
  },
  {
    word: 'much',
    sentences: ['How much does the book cost?', 'There is not much milk left in the bottle.', 'Thank you very much for all your help.'],
  },
  {
    word: 'mean',
    sentences: ['What does this word mean?', 'A red light does mean stop.', 'I did not mean to break it, and it was an accident.'],
  },
  {
    word: 'may',
    sentences: ['You may go outside when your work is finished.', 'It may rain later, so take your coat.', 'May I have a drink, please?'],
  },
  {
    word: 'such',
    sentences: [
      'It was such a good film that we saw it twice.',
      'I have never seen such a big dog.',
      'Bring fruit such as an apple or a pear.',
    ],
  },
  {
    word: 'tell',
    sentences: [
      'Tell me your name, and I will write it down.',
      'Please tell the truth, and do not tell a lie.',
      'The clock will tell you the time.',
    ],
  },
  {
    word: 'really',
    sentences: [
      'I really like this book, and it is my favourite.',
      'Is that really true, or is it a joke?',
      'It was really cold, and the water turned to ice.',
    ],
  },
  {
    word: 'company',
    sentences: [
      'We had company for dinner, and six people came.',
      'My father works for a big company in the city.',
      'The dog is good company when I am alone.',
    ],
  },
  {
    word: 'life',
    sentences: [
      'A cat has a long life, and some cats live for twenty years.',
      'There is no life on the moon, because it has no air.',
      'My life changed when my sister was born.',
    ],
  },
  {
    word: 'place',
    sentences: [
      'Put the book back in its place on the shelf.',
      'This is a good place to sit, because it is quiet.',
      'The park is my favourite place in the town.',
    ],
  },
  {
    word: 'long',
    sentences: [
      'The train is very long, but the car is short.',
      'We waited a long time for the bus.',
      'Her hair is so long that it covers her back.',
    ],
  },
  {
    word: 'between',
    sentences: [
      'The cat sat between the two chairs.',
      'Share the cake between you and your brother.',
      'The shop is between the school and the park.',
    ],
  },
  { word: 'feel', sentences: ['I feel happy when the sun shines.', 'Feel the soft hair of the cat.', 'Do you feel ill, or are you well?'] },
  {
    word: 'still',
    sentences: [
      'Sit still, and do not move your arms.',
      'It is still raining, and the rain has not stopped.',
      'The water in the pond was still and flat.',
    ],
  },
  {
    word: 'problem',
    sentences: [
      'The problem was hard, but I found the answer.',
      'If you have a problem, ask a teacher to help.',
      'The car has a problem, and it will not start.',
    ],
  },
  {
    word: 'lot',
    sentences: [
      'There is a lot of water in the river.',
      'A lot of children came to the party.',
      'I have a lot of work, and it will take all day.',
    ],
  },
  {
    word: 'leave',
    sentences: [
      'Leave your bag by the door.',
      'We leave the house at eight, and we arrive at nine.',
      'Do not leave your coat behind, because it will rain.',
    ],
  },
  {
    word: 'number',
    sentences: ['Seven is my favourite number.', 'Write the number of children in your class.', 'A large number of birds sat on the roof.'],
  },
  {
    word: 'part',
    sentences: [
      'This part of the book is the best part.',
      'Each part of the cake is a piece, and I want one part.',
      'Cut the apple, and give a part of it to your friend.',
    ],
  },
  {
    word: 'point',
    sentences: ['The pencil has a sharp point at the end.', 'Point at the picture that you like.', 'My team scored one point in the game.'],
  },
  {
    word: 'help',
    sentences: ['Can you help me to carry the box?', 'Thank you for your help with my homework.', 'A map will help you to find the way.'],
  },
  {
    word: 'something',
    sentences: [
      'There is something in my shoe, and it hurts.',
      'I want something to eat, because I am hungry.',
      'Tell me something about your day.',
    ],
  },
  {
    word: 'another',
    sentences: [
      'Give me another sweet, because I want more than one.',
      'Give me another chance to try again.',
      'This pen does not write, so give me another pen.',
    ],
  },
  {
    word: 'become',
    sentences: [
      'A baby will become a child, and then a grown woman.',
      'The water will become ice when it is very cold.',
      'She wants to become a doctor when she is older.',
    ],
  },
  {
    word: 'late',
    sentences: [
      'I was late for school, because the bus was slow.',
      'Do not stay up late, because you need sleep.',
      'The train is late, and it will arrive after nine.',
    ],
  },
  { word: 'next', sentences: ['The next house is my house.', 'We will go swimming next week.', 'We got off the bus at the next stop.'] },
  {
    word: 'end',
    sentences: [
      'The end of the film was very sad.',
      'At the end of the road, turn left.',
      'The holiday will end tomorrow, and school starts again.',
    ],
  },
  { word: 'why', sentences: ['Why is the sky blue?', 'Tell me why you are sad.', 'I do not know why the dog barked.'] },
  {
    word: 'might',
    sentences: ['It might rain, so take your coat.', 'I might go to the park, but I am not sure.', 'Be careful, or you might fall.'],
  },
  {
    word: 'must',
    sentences: ['You must wash your hands before dinner.', 'We must go now, or we will be late.', 'Every child must bring a pen.'],
  },
  {
    word: 'never',
    sentences: ['I have never seen snow in the summer.', 'Never touch the hot fire.', 'She is never late, and she always arrives early.'],
  },
  {
    word: 'include',
    sentences: [
      'The price will include a drink and a cake.',
      'Include your name at the top of the page.',
      'The list does include every child in the class.',
    ],
  },
  {
    word: 'course',
    sentences: [
      'Of course you can come with us.',
      'The river changed its course and went another way.',
      'We ate the first course before the sweet food.',
    ],
  },
  {
    word: 'report',
    sentences: [
      'Write a report about your school trip.',
      'The report says that the weather will be wet.',
      'Report the problem to a teacher.',
    ],
  },
  {
    word: 'case',
    sentences: [
      'Put your glasses back in the case.',
      'In that case, we will wait until tomorrow.',
      'The case holds my pens and my pencils.',
    ],
  },
  {
    word: 'seem',
    sentences: [
      'You seem tired, and your eyes are closed.',
      'The dog does not seem well today.',
      'These two things seem the same, but they are different.',
    ],
  },
  {
    word: 'let',
    sentences: ['Let me help you with the bags.', 'My parents let me stay up late on Saturday.', 'Do not let the cat outside.'],
  },
  {
    word: 'keep',
    sentences: [
      'Keep the money in a safe place.',
      'Keep quiet, because the baby is sleeping.',
      'You can keep the book, because I have another.',
    ],
  },
  {
    word: 'during',
    sentences: ['During the film I ate all my sweets.', 'We stay inside during the rain.', 'Birds fly away during the winter.'],
  },
  {
    word: 'big',
    sentences: ['A big animal needs a lot of food.', 'The big dog is much larger than the small cat.', 'The box is too big for the shelf.'],
  },
  { word: 'set', sentences: ['Set the plates on the table.', 'I have a set of six cups.', 'The sun will set in the evening.'] },
  {
    word: 'small',
    sentences: ['A mouse is a small animal, and it is not big.', 'This coat is too small for me now.', 'Cut the cake into small pieces.'],
  },
]
