import type { BankEntry } from '../bank'

// Sentences for the common exception words for years 1 and 2. Our own work (CC0).
// The bank has no sentences for a function word, for example "the" or "was", because it has no meaning of its own.
// Each sentence helps a child to understand the meaning of the word. src/sentences/bank.test.ts checks the rules.
export const COMMON_EXCEPTION_WORDS_BANK: readonly BankEntry[] = [
  {
    word: 'today',
    sentences: ['Yesterday was hot, but today is cold.', 'What day is it today?', 'I will do my homework today, not tomorrow.'],
  },
  {
    word: 'said',
    sentences: ['She said hello and asked how I was.', 'When I asked for more cake, Dad said no.'],
  },
  {
    word: 'says',
    sentences: ['My mum always says that I must tell the truth.', 'Dad says he will tell us a story.'],
  },
  {
    word: 'she',
    sentences: ['My sister is nine, and she likes to swim.', 'My mother said she was proud of me.'],
  },
  {
    word: 'go',
    sentences: ['It is time to go home.', 'Let us go to the park.', 'Go and get your coat, because it is cold.'],
  },
  {
    word: 'here',
    sentences: ['Come here and sit next to me.', 'This is the place. Meet me here.'],
  },
  {
    word: 'love',
    sentences: ['I love my family, and they love me.', 'I love ice cream because it makes me happy.'],
  },
  {
    word: 'come',
    sentences: ['Come here, and then we can go outside.', 'You can come to my house, or I can go to yours.'],
  },
  {
    word: 'once',
    sentences: ['I have never seen snow, but my brother saw it once.', 'Clean your teeth twice a day, not just once.'],
  },
  {
    word: 'ask',
    sentences: ['Put up your hand to ask a question.', 'Ask Dad, and he will tell you the answer.'],
  },
  {
    word: 'friend',
    sentences: ['My friend is like a brother to me.', 'My friend and my sister came to my party.'],
  },
  {
    word: 'school',
    sentences: ['At school, my teacher helps me learn to read.', 'Our school has a big hall and a class for each year.'],
  },
  {
    word: 'put',
    sentences: ['Put your books back on the shelf.', 'Please put the cake in the box to keep it safe.'],
  },
  {
    word: 'push',
    sentences: ['Push the door to open it, then pull it to close it.', 'Push the swing, and it will move.'],
  },
  {
    word: 'pull',
    sentences: ['Try to pull the heavy box across the floor.', 'Pull the door towards you, and push it away from you.'],
  },
  {
    word: 'full',
    sentences: ['My cup is full, but your cup is empty.', 'The bus was so full that we had to stand.'],
  },
  {
    word: 'house',
    sentences: ['Our house has a red door and two windows.', 'Our house has four rooms.'],
  },
  {
    word: 'door',
    sentences: ['Please close the door when you leave the room.', 'Open the window and the door to let the air in.'],
  },
  {
    word: 'floor',
    sentences: ['My toys are all over the floor of my room.', 'Pick your coat up off the floor and put it by the door.'],
  },
  {
    word: 'poor',
    sentences: ['Some people are rich, but other people are poor.', 'The poor man had no money to buy food.'],
  },
  {
    word: 'find',
    sentences: ['I cannot find my shoe. Can you help me look for it?', 'Let us look under the bed to find the lost cat.'],
  },
  {
    word: 'kind',
    sentences: ['A kind person is good to everyone.', 'Be kind and nice to the new girl in your class.'],
  },
  {
    word: 'mind',
    sentences: ['In your mind, imagine that you can fly.', 'Think hard and use your mind to answer the question.'],
  },
  {
    word: 'behind',
    sentences: ['Stand behind the line, at the back of the queue.', 'I left my bag behind, so I went back for it.'],
  },
  {
    word: 'child',
    sentences: ['A mother held her child by the hand.', 'When my father was a child, he was a little boy.'],
  },
  {
    word: 'children',
    sentences: ['The children played in the park with their mother.', 'Young children need lots of sleep.'],
  },
  {
    word: 'wild',
    sentences: ['A fox is a wild animal, but a dog is a pet.', 'Wild birds eat the seeds in our garden.'],
  },
  {
    word: 'climb',
    sentences: ['It took an hour to climb to the top of the mountain.', 'Cats can climb trees and jump down.'],
  },
  {
    word: 'most',
    sentences: ['Most of the class like football, but a few do not.', 'Many children like dogs, and most children like cats.'],
  },
  {
    word: 'only',
    sentences: ['You can only choose one, not both.', 'I have only two sweets, just two.'],
  },
  {
    word: 'both',
    sentences: ['Hold the cup with both hands.', 'My two friends are both nine, and both of them love football.'],
  },
  {
    word: 'old',
    sentences: ['My grandad is old, but my baby sister is young.', 'The old man walked slowly with a stick.'],
  },
  {
    word: 'cold',
    sentences: ['In winter, the weather is cold, so wear a warm coat.', 'Ice cream is cold, but soup is hot.'],
  },
  {
    word: 'gold',
    sentences: ['Gold and silver are two kinds of metal.', 'The winner of the race got a gold cup.'],
  },
  {
    word: 'hold',
    sentences: ['Hold my hand when we cross the road.', 'Can you hold my bag while I take off my coat?'],
  },
  {
    word: 'told',
    sentences: ['I told my friend a secret, and she did not tell anyone.', 'Mum told me to tidy my room, and I did what she said.'],
  },
  {
    word: 'every',
    sentences: ['Each child gets a book, so every child can read.', 'We go swimming every week.'],
  },
  {
    word: 'everybody',
    sentences: ['Everybody in the class clapped, so everyone was happy.', 'Say hello to everybody, because nobody likes to feel left out.'],
  },
  {
    word: 'even',
    sentences: ['It was cold, and it was even colder at night.', 'My brother is fast, but my sister is even faster.'],
  },
  {
    word: 'great',
    sentences: ['We had a great time at the beach.', 'You did a great job. Well done!'],
  },
  {
    word: 'break',
    sentences: ['Drop an egg, and it will break.', 'At break time, we play outside.'],
  },
  {
    word: 'steak',
    sentences: ['We ate steak with potatoes for dinner.', 'The cook made a steak in the restaurant kitchen.'],
  },
  {
    word: 'pretty',
    sentences: ['What a pretty dress. It looks beautiful on you.', 'My sister looks pretty in her new dress.'],
  },
  {
    word: 'beautiful',
    sentences: ['What a beautiful and wonderful day!', 'The garden looks beautiful with all the flowers.'],
  },
  {
    word: 'fast',
    sentences: ['The car was fast, but the bike was slow.', 'Run fast, or you will miss the bus.'],
  },
  {
    word: 'last',
    sentences: ['Last week, we went on a school trip.', 'He was the last child in the line, at the very end.'],
  },
  {
    word: 'past',
    sentences: ['We walked past the shop on the way home.', 'In the past, people did not have cars.'],
  },
  {
    word: 'father',
    sentences: ['My father and my mother both work.', 'Your father is your dad.'],
  },
  {
    word: 'class',
    sentences: ['Our class has a new teacher this year.', 'Every pupil in the class has a school book.'],
  },
  {
    word: 'grass',
    sentences: ['The cows eat the green grass in the field.', 'Please do not walk on the grass in the garden.'],
  },
  {
    word: 'pass',
    sentences: ['Pass the ball to your friend.', 'In football, you can pass the ball or throw it.'],
  },
  {
    word: 'plant',
    sentences: ['We plant seeds, and they grow into flowers.', 'A plant needs water and sun to grow.'],
  },
  {
    word: 'path',
    sentences: ['Follow the path through the woods to the river.', 'Stay on the path, which is the way to the beach.'],
  },
  {
    word: 'bath',
    sentences: ['I have a warm bath before bed.', 'Fill the bath with water, and then get in.'],
  },
  {
    word: 'hour',
    sentences: ['There are sixty minutes in an hour.', 'Lunch lasts for one hour in the middle of the day.'],
  },
  {
    word: 'move',
    sentences: ['We will move to a new house next week.', 'Push the table to move it.'],
  },
  {
    word: 'prove',
    sentences: ['I doubt it, so prove that it is true.', 'Show me your work to prove that you did it.'],
  },
  {
    word: 'improve',
    sentences: ['Practice will help you improve your reading.', 'Reading every day will help you improve.'],
  },
  {
    word: 'sure',
    sentences: ['Are you sure you know the answer?', 'I think so, but I am not sure.'],
  },
  {
    word: 'sugar',
    sentences: ['Sugar makes food and drink taste sweet.', 'Would you like sugar in your tea or coffee?'],
  },
  {
    word: 'eye',
    sentences: ['Close one eye and look through the window.', 'I see with my eye, and I hear with my ear.'],
  },
  {
    word: 'should',
    sentences: ['You should go to bed early, because you need sleep.', 'Should I take my coat, or will it be warm?'],
  },
  {
    word: 'whole',
    sentences: ['The whole family, every single person, came to the party.', 'She read the whole book in one day, from start to end.'],
  },
  {
    word: 'many',
    sentences: ['There are many stars in the sky, but only a few clouds.', 'Many children have a pet.'],
  },
  {
    word: 'clothes',
    sentences: ['Wear warm clothes, like a coat and a hat.', 'Her clothes include a dress, a coat and shoes.'],
  },
  {
    word: 'people',
    sentences: ['Many people live in the big city.', 'People need food, water and sleep.'],
  },
  {
    word: 'water',
    sentences: ['Fish swim in the water of the sea.', 'Drink lots of water when it is hot.'],
  },
  {
    word: 'again',
    sentences: ['Read it once, and then read it again.', 'I lost the game, so I will start again.'],
  },
  {
    word: 'half',
    sentences: ['Two is half of four, and four is twice two.', 'I ate half of the apple, and my sister ate the rest.'],
  },
  {
    word: 'money',
    sentences: ['I will spend my money on a book.', 'We pay for things with money.'],
  },
  {
    word: 'Mr',
    sentences: ['Mr Green has a son and a daughter.', 'Mr Green is the father of my best friend.'],
  },
  {
    word: 'Mrs',
    sentences: ['Mrs Green is the mother of my best friend.', 'Mrs Green lives with her husband and her daughter.'],
  },
  {
    word: 'parents',
    sentences: ['Your parents are your mother and father.', 'Parents look after their children.'],
  },
  {
    word: 'Christmas',
    sentences: ['Christmas is a winter holiday, and we give gifts.', 'We eat a big dinner at Christmas.'],
  },
]
