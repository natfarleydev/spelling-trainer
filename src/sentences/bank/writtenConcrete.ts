import type { BankEntry } from '../bank'

// Sentences for concrete words that do not have 3 good Tatoeba sentences. Our own work (CC0).
// The vetting of the first Tatoeba batch (2026-09-15) found only idioms for some words, for example "pull it off",
// "pretty much" or "in shape". Each sentence here shows the meaning of the word. src/sentences/bank.test.ts checks the rules.
export const WRITTEN_CONCRETE_BANK: readonly BankEntry[] = [
  {
    word: 'run',
    sentences: ['I had to run fast to catch the bus.', 'Dogs love to run in the park.', 'The children run across the field at break time.'],
  },
  { word: 'head', sentences: ['Put a hat on your head, because it is cold.', 'I turned my head to look at the bird.'] },
  { word: 'eye', sentences: ['I closed one eye and looked through the hole.', 'The doctor looked into my eye with a small light.'] },
  { word: 'cut', sentences: ['Mum cut the cake into eight pieces.'] },
  { word: 'draw', sentences: ['Can you draw a picture of your family?'] },
  { word: 'white', sentences: ['The snow on the ground was white and soft.'] },
  {
    word: 'round',
    sentences: ['A ball is round, like the moon.', 'A circle and a ball are both round.', 'The plate is round and flat.'],
  },
  { word: 'kid', sentences: ['The kid next door likes to play football.'] },
  {
    word: 'air',
    sentences: ['Open the window to let some fresh air in.', 'Birds fly through the air.', 'Take a deep breath of air.'],
  },
  { word: 'foot', sentences: ['I hurt my foot when I kicked the ball.'] },
  { word: 'arm', sentences: ['She waved her arm to say hello.'] },
  {
    word: 'heart',
    sentences: ['Your heart beats faster when you run.', 'The doctor listened to my heart.', 'I drew a red heart on the card.'],
  },
  {
    word: 'pretty',
    sentences: [
      'The pretty flowers in the garden are pink.',
      'She wore a pretty dress to the party.',
      'What a pretty picture you have drawn!',
    ],
  },
  { word: 'machine', sentences: ['A washing machine cleans our clothes.', 'The machine at the station sells tickets.'] },
  { word: 'wide', sentences: ['The river is too wide to swim across.'] },
  { word: 'club', sentences: ['I go to the swimming club every Saturday.'] },
  { word: 'card', sentences: ['I made a card for my mum on her special day.', 'We played a card game after dinner.'] },
  {
    word: 'pull',
    sentences: ['Pull the door to open it.', 'Help me pull the heavy box across the floor.', 'The dog tried to pull me along the path.'],
  },
  { word: 'touch', sentences: ['Do not touch the fire, because it is hot.', 'Close your eyes and touch your nose.'] },
  { word: 'fill', sentences: ['Fill the glass with cold water.', 'Fill the box with sand at the beach.'] },
  { word: 'star', sentences: ['At night, I can see a bright star in the sky.'] },
  { word: 'huge', sentences: ['A mountain is huge, but a hill is small.'] },
  { word: 'push', sentences: ['Push the door to open it.', 'Push the door, then pull it closed.'] },
  { word: 'sing', sentences: ['We sing songs together in class.'] },
  { word: 'dance', sentences: ['We like to dance to music at parties.'] },
  { word: 'rock', sentences: ['We sat on a big rock by the sea.'] },
  { word: 'fix', sentences: ['Dad will fix my broken bike.', 'Can you fix the hole in my coat?'] },
  {
    word: 'shape',
    sentences: ['A circle is a round shape.', 'A square is a shape with four sides.', 'The cloud looked like the shape of a dog.'],
  },
  // The second Tatoeba batch (concrete words 150 to 300).
  {
    word: 'hang',
    sentences: ['Hang your coat on the hook by the door.', 'We hang pictures on the wall.', 'Hang the wet clothes outside to dry.'],
  },
  { word: 'reader', sentences: ['A good reader reads a lot of books.'] },
  { word: 'roll', sentences: ['Roll the ball across the floor to the baby.'] },
  {
    word: 'lesson',
    sentences: [
      'Our first lesson today is music.',
      'In the swimming lesson, we learned to float.',
      'The teacher started the lesson by reading a story.',
    ],
  },
  {
    word: 'earth',
    sentences: ['The earth goes around the sun.', 'The moon goes around the earth.', 'Plants grow in the earth in the garden.'],
  },
  { word: 'strange', sentences: ['We heard a strange noise in the night.'] },
  { word: 'mouth', sentences: ['Open your mouth wide so the doctor can see your teeth.'] },
  { word: 'square', sentences: ['A square has four sides that are the same.', 'Cut the paper into a square.'] },
  { word: 'skin', sentences: ['Put on sun cream to protect your skin.', 'Our skin keeps our body warm and safe.'] },
  { word: 'shoe', sentences: ['Put a shoe on each foot before you go outside.'] },
  { word: 'hall', sentences: ['The whole school met in the hall for the show.'] },
  { word: 'cup', sentences: ['I drank a cup of warm milk before bed.'] },
  { word: 'finger', sentences: ['I hurt my finger when I shut the door.'] },
  { word: 'tie', sentences: ['Tie the boat to the post so it does not float away.'] },
  {
    word: 'ice',
    sentences: ['The pond froze, and the ice was thick.', 'Put some ice in my drink to make it cold.', 'Be careful not to fall on the ice.'],
  },
  { word: 'coast', sentences: ['We drove along the coast and looked at the sea.'] },
  { word: 'alive', sentences: ['The fish was still alive, so we put it back in the water.'] },
  { word: 'sweet', sentences: ['Sugar makes cakes taste sweet.'] },
  { word: 'knock', sentences: ['Please knock before you come into my room.'] },
  { word: 'metal', sentences: ['Keys and coins are made of metal.', 'The old metal gate was cold to touch.'] },
  { word: 'sharp', sentences: ['The cat has sharp teeth.'] },
]
