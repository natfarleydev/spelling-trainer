# CLAUDE.md

This file gives instructions for work in this repository.

## Project goal

This project is a GitHub Pages app.
The user gives a list of 10 spelling words.
The app makes a presentation from these words.

GitHub Pages serves only static files.
Thus, the app must operate fully in the browser.

- Live site: https://natfarleydev.github.io/spelling-trainer/
- The app is in alpha. Keep the alpha sticker on the page until the user tells you to remove it.

## Stack

- React 19 with TypeScript.
- Vite 8 builds the app.
- Vitest runs the unit tests and the component tests. The component tests use Testing Library and happy-dom.
- Turborepo keeps the results of the lint checks, the type checks and the tests in a local cache.
- Playwright runs the smoke tests in the `e2e` folder.
- oxlint does the lint checks.
- jsPDF makes the PDF file. PptxGenJS makes the PPTX file.
- GitHub Actions runs the CI and deploys to GitHub Pages.

## Commands

| Command | Result |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run test:watch` | Run the unit tests and the component tests after each change. Use this during TDD. |
| `npm run check` | Run the lint checks, the type checks and the tests with the Turborepo cache. |
| `npm run lint` | Run the lint checks. |
| `npm run typecheck` | Run the type checks. |
| `npm test` | Run the unit tests and the component tests one time. |
| `npm run test:e2e` | Make the production build and run the Playwright smoke tests. |
| `npm run build` | Do the type checks and make the production build. |
| `npm run build:vectors` | Make `public/data/word-vectors.bin` again from the GloVe cache in `.cache/glove`. The script tells you how to get the cache. |

## Testing: test-driven development (TDD)

TDD is mandatory. Be obsessive about tests.
Do not write production code before a test that fails.

Obey this cycle for each change:

1. **Red:** Write one small test for the new behavior.
2. Run the test. Make sure that it fails for the correct reason.
3. **Green:** Write the minimum code that makes the test pass.
4. Run all the tests. Make sure that they all pass.
5. **Refactor:** Make the code better. Keep all the tests green.

Use three levels of tests:

- **Unit tests (Vitest, `unit` project):** Each pure unit must have unit tests. Put the test file next to the unit. Name it `<unit>.test.ts`. These tests run in the node environment, which is fast.
- **Component tests (Vitest, `component` project):** Each React component must have component tests. Name the file `<Component>.test.tsx`. These tests use Testing Library in happy-dom. Test what the user sees and does, not the internal state.
- **No layout in component tests:** happy-dom does not calculate a layout. Do not spy on DOM prototypes to make a layout. Give the measurement to the component as a prop, and give a fake in the test. Example: `Slideshow` gets `measureWord`. The smoke tests cover the real measurement.
- **Smoke tests (Playwright):** Each user-visible feature must have a smoke test in `e2e/`. The smoke tests use the production build.

If a test passes before you write the code, prove that the test can fail. Break the code for a short time, run the test, then restore the code.

Also obey these rules:

- A defect fix starts with a test that shows the defect.
- Do not delete a test to make the tests pass.
- Do not skip a test. Do not commit `test.only` or `it.skip`.
- Run `npm run check` and `npm run test:e2e` before each push.

### Fast feedback

Speed is necessary for TDD. Keep the red-green cycle short.

- During the cycle, keep `npm run test:watch` open. Watch mode runs only the tests that a change affects, and it has no start time.
- To run one test file one time, call Vitest with node: `node node_modules/vitest/vitest.mjs run src/words.test.ts`.
- Do not use `npx` in a loop. On this project, `npx` adds approximately 3.3 seconds and `npm run` adds approximately 1.1 seconds to each command.
- Run Playwright with a filter during the cycle: `npm run test:e2e -- -g "the test name"`.
- `npm run check` uses the Turborepo cache. If the inputs of a task do not change, Turborepo gives the stored result immediately.
- Keep pure logic in `*.test.ts` files. These tests run in the node environment and are much faster than component tests.
- Measure before you change the test setup. Keep a change only when it gives a measured improvement.

## Clarifying questions

Always ask clarifying questions about the functionality before you write the code.

- Ask when a requirement has more than one possible meaning.
- Ask when a decision changes what the user sees or does.
- Give options, and give your recommendation first.
- Do not guess the behavior of a feature.

## User experience: NN/g guidance

Be obsessive about good user experience (UX). Obey the guidance from the Nielsen Norman Group (NN/g).

- Use the 10 usability heuristics of Jakob Nielsen for each feature.
- Show the status of the system. Example: tell the user when the app saves a presentation.
- Prevent errors before they occur. Do not let the user lose work by accident.
- Give the user control. Supply undo, and make it easy to go back.
- Use the words of the user, not technical words.
- Make the actions and options visible. Do not make the user remember them.
- Make the app accessible. Use semantic HTML, labels and a visible keyboard focus.
- Make the app operate on a phone, a tablet and a desktop computer.
- Include the UX rules in the tests. Example: a smoke test proves that a reload does not lose a presentation.

## Style guide

Obey this style guide for all pages, slides and downloads. The tests in `src/theme` and the smoke tests check the parts that a machine can measure.

### Audience and feel

- Children in KS2 (ages 7 to 11) look at the slides. Teachers and parents use the pages.
- The app must feel friendly, bright and calm. Use colour and round shapes for a playful feel. Do not add clutter.
- Clarity is more important than decoration. Each page has one primary action.
- Write all interface text in STE. Use short labels in sentence case. Example: "Make the presentation".

### Fonts

| Use | Font | Licence | Why |
| --- | --- | --- | --- |
| Slides (the word and the sentence), page titles | **Playpen Sans** by TypeTogether | OFL-1.1 | It looks like handwriting. It has a single-storey "a" and "g", which are the shapes that children learn to write. |
| All other interface text | **Andika** by SIL International | OFL-1.1 | SIL made it for new readers. It has a single-storey "a" and "g", and "I", "l" and "1" are different. |

- Host the fonts with the app through `@fontsource`. Do not load fonts from a third-party server, because children use the app.
- Use these fallback stacks: `'Playpen Sans', 'Andika', 'Comic Sans MS', sans-serif` and `'Andika', 'Comic Sans MS', sans-serif`. Comic Sans MS is a default font on Windows and macOS, and it also has a single-storey "a" and "g".
- **Known limit (measured on 2026-09-15):** in Playpen Sans, the capital "I" and the lowercase "l" look almost the same, and no stylistic set changes this. Do not use Playpen Sans for text where this confusion matters, for example an id or a code.
- Do not use capital letters for a full word or sentence. Exception: the alpha sticker.

### Type sizes

- Interface text: minimum 1rem (16px). Line height 1.5. Maximum line length 60ch.
- Page title: 2.25rem, Playpen Sans, weight 700. Section heading: 1.35rem, Andika, weight 700.
- Slide word: Playpen Sans, weight 700. The slide measures the word and fits it (maximum 90% of the width and 40% of the height).
- Slide sentence: Playpen Sans, weight 400, `clamp(1.5rem, 4vw, 3.25rem)`, line height 1.3.
- In the sentence, show the word under test in bold with a thick primary underline. This helps the child to connect the word and its meaning.

### Colours

The CSS custom properties in `src/index.css` are the colour tokens. `src/theme/contrastPairs.ts` lists the pairs that the tests check.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#FFFBF2` | Page background (warm white) |
| `--ink` | `#1F2544` | Main text, word on the slide, focus ring |
| `--ink-soft` | `#4A4F6A` | Secondary text, sentence on the slide |
| `--line` | `#E6DCC8` | Decorative dividers only |
| `--line-strong` | `#8A8069` | Borders of text boxes, selectors and secondary buttons |
| `--primary` | `#2657D4` | Primary buttons, links, the underline of the word in the sentence |
| `--primary-dark` | `#1B3F9E` | Hover and pressed state of primary buttons |
| `--on-primary` | `#FFFFFF` | Text on primary colours |
| `--sunshine` | `#FFC83D` | Alpha sticker, highlights (with ink text only) |
| `--coral` | `#FF6F59` | Decoration only, or behind ink text |
| `--mint` | `#3CCB9F` | Decoration only, or behind ink text |
| `--grape` | `#8B6FE8` | Decoration only |
| `--danger` | `#B42318` | Error text |
| `--success` | `#11785A` | Success text |
| `--slide-cream`, `--slide-sky`, `--slide-mint`, `--slide-lilac`, `--slide-peach` | `#FFF4D6`, `#DDF0FF`, `#DDF7EC`, `#EDE6FF`, `#FFE4DC` | Slide backgrounds. The slides use them in this order, then start again. |

Measured contrast (WCAG 2.x) for the most important pairs:

| Pair | Ratio | Minimum |
| --- | --- | --- |
| `--ink` on `--paper` | 14.46:1 | 4.5:1 |
| `--ink-soft` on `--paper` | 7.77:1 | 4.5:1 |
| `--on-primary` on `--primary` | 6.18:1 | 4.5:1 |
| `--primary` on `--paper` | 5.99:1 | 4.5:1 |
| `--ink` on `--sunshine` | 9.66:1 | 4.5:1 |
| `--line-strong` on `--paper` | 3.78:1 | 3:1 (control border) |
| `--ink` on each slide background | 12.35:1 to 13.63:1 | 7:1 (projectors) |
| `--ink-soft` on each slide background | 6.63:1 to 7.32:1 | 4.5:1 |

Rules:

- Do not put white text on `--coral`, `--sunshine`, `--mint` or `--grape`. White on coral is only 2.74:1.
- Do not use `--line` for a control border. It is only 1.32:1 on paper.
- Do not use colour as the only signal. An error message also has words, for example "The download failed. Try again."
- A new colour pair for text must go into `src/theme/contrastPairs.ts` with its minimum.

### Shapes, spacing and depth

- Spacing scale: 4, 8, 12, 16, 24, 32 and 48 px.
- Corner radius: 12px for text boxes and selectors, 20px for cards, full pill shape for buttons.
- Depth: a soft, solid shadow under buttons and cards (`0 4px 0 rgb(31 37 68 / 15%)`). A pressed button moves 2px down and its shadow gets smaller.
- Touch targets: minimum 44 × 44 px.

### Components

- **Primary button:** `--primary` background, `--on-primary` text, pill shape, solid shadow. Hover: `--primary-dark`.
- **Secondary button:** `--paper` background, `--ink` text, 2px `--line-strong` border.
- **Text box and selector:** `--paper` background, 2px `--line-strong` border, 12px radius, Andika.
- **Focus:** a 3px `--ink` outline with a 2px offset on each focusable element. Do not remove it.
- **Saved presentation card:** a card with a coloured left edge. The colours go in the order coral, mint, grape, sunshine.
- **Alpha sticker:** `--sunshine` background, `--ink` text, dashed `--ink` border, turned 12 degrees.
- **Slide:** a full slide background from the slide colours, the word in `--ink`, the sentence in `--ink-soft`, and round slide controls.
- **Messages:** status text in `--ink-soft`, errors in `--danger`, success in `--success`.

### Motion

- Use short transitions (maximum 150 ms) for hover and press.
- When the user sets `prefers-reduced-motion: reduce`, do not move or animate anything.

### Downloads

- **PDF:** embed Playpen Sans (static TTF files) with jsPDF. Use the same slide backgrounds and layout as the screen.
- **PPTX:** PptxGenJS cannot embed fonts. Use "Comic Sans MS". Windows and macOS install it, it has a single-storey "a" and "g", and its "I", "l" and "1" are different (measured on 2026-09-15). Do not use Century Gothic: it was not installed on the Windows test computer. Use the same slide background colours.

### How to check the style guide

- `src/theme/contrast.test.ts` tests the WCAG contrast calculation.
- `src/theme/palette.test.ts` reads `src/index.css` and checks each pair in `src/theme/contrastPairs.ts`.
- A smoke test runs axe-core on the home page and on a slide. It must find no serious or critical problems.
- A smoke test checks that the browser loaded Playpen Sans and Andika.
- Look at the desktop and phone screenshots in `test-results/screenshots` after each visual change.

## Code style: functional programming

Use functional programming in all the code. Composition is the primary tool.
Composition makes the tests fast and keeps each test isolated.

- Write pure functions. A pure function gives the same output for the same input. It has no side effects.
- Do not change data. Make new data. Use `readonly` types.
- Keep the side effects at the edge of the app. Use the "functional core, imperative shell" pattern.
- The core calculates plain data. Example: `layoutPdf` calculates the position and size of the text.
- The shell is thin. It only composes the core functions and does the side effects. Example: `downloadPdf` loads jsPDF, draws the layout and saves the file.
- Give a dependency to a function as an argument. Do not import a dependency with side effects into the core.
- Use small interfaces for dependencies. Example: `PdfWriter` has only the jsPDF methods that `drawPdf` uses.
- In unit tests, use a small fake for a dependency. Do not load a large library in a unit test.
- Do not use classes for app logic.
- React components must be thin. Move logic into pure functions and test these functions.
- Give side effects to a component as props with real defaults. Example: `App` gets `downloads`. The component tests give fakes.

## Third-party code and data

Provenance must always be clear.

- Before you add a library or data, find its licence. Do not add it if the licence is not clear.
- Start each third-party data file with an SPDX licence line, the source, the version, the citation and a list of our changes.
- Add each runtime library to the README table "Runtime libraries".
- Add each data source to the README table "Data".
- The repository uses CC0 1.0. A ShareAlike file keeps its own licence. Name it in the README section "Licence".
- Keep test-only data in a `testing` folder, so that the app build does not include it.

## Sentences: British English

The app makes a simple sentence for each spelling word.

- Use British English in all sentences and all user interface text. Example: "colour", "programme", "holiday".
- In a sentence, only the word under test can be difficult. All other words must be in the first 1000 NGSL words or in `EXTRA_SIMPLE_WORDS`. The tests make sure of this.
- Add a word to `EXTRA_SIMPLE_WORDS` only when a template needs it, and only when a young child in the UK knows it.
- If the tagger gives the wrong word type, add the word to `WORD_OVERRIDES` with a test. Use the KS2 statutory word lists to find problems.

### Sentence bank

A sentence must help the child to understand the **meaning** of the word. Example: "The astronaut was nervous about going into space."

- Write bank sentences in `src/sentences/bank/`. Give each word at least 2 different sentences. Use a mix of real life and a little fun.
- Use only words that a KS2 child knows: all NGSL words, the spelling lists, `EXTRA_SIMPLE_WORDS`, `KNOWN_EXTRA_WORDS`, `FUNCTION_WORD_FORMS` and `NUMBER_WORDS`. `isKnownWord` also accepts a base form, for example "drawings" from "draw".
- Add a word to `KNOWN_EXTRA_WORDS` only when a bank sentence needs it, and only when a child aged 7 to 11 in the UK knows it.
- Meaning rule: at least one content word in the sentence must have a word vector similarity of 0.40 or more with the word under test. Before you write a sentence, find clue words with the word vectors.
- Keep a sentence to a maximum of 15 words, with no apostrophe.
- `src/sentences/bank.test.ts` checks all these rules. It also checks that the bank has each word of the statutory lists for years 3 to 6, and each common exception word for years 1 and 2 that is not in `FUNCTION_WORDS`.
- The app chooses a bank sentence first. If the bank has no sentence for the word, the app chooses a template sentence, and the presentation page tells the teacher that the sentence does not show the meaning.
- The app uses bank sentences only for the word type from the tagger. If the teacher selects a different type, the app uses the templates.
- Give each word a minimum of 3 good sentences, so that the teacher has a choice when one sentence does not operate.

### Tatoeba sentences (decisions from 2026-09-15)

The bank also uses real sentences from [Tatoeba](https://tatoeba.org) (CC BY 2.0 FR). A build script finds and scores them. A person does not approve each sentence: Claude reads the best candidates and chooses them.

- **Words:** all NGSL words and all the spelling lists. Do the work in batches, most frequent words first.
- **Quality:** a sentence must give **context** for the word. A valid sentence is not sufficient. Example: "We eat food when we are hungry." is good. "Tom put the food on the table." is not good.
- **Hard filters:** a whole sentence, a short length for KS2, the word one time, only known words, British English, no topic from the blocklist.
- **Names and contractions:** allow a short list of common first names. Expand contractions (for example, "don't" to "do not") and record the change. Do not allow a possessive apostrophe.
- **Score:** a GDEX score (Kilgarriff et al. 2008) multiplied by a context score. The context score hides the word and measures how well a masked language model guesses it. Run the model only at build time, never in the browser.
- **GDEX details:** the best length is 6 to 10 words. The commonness of each word comes from its NGSL rank. A greylist word (formal, old-fashioned, American or adult) multiplies the score by 0.7. The first review found that a yes-or-no commonness check gave 1.00 to 94% of the candidates, so the old sentences with the lowest ids won.
- **Diversity:** do not pick a sentence that shares 40% or more of its three-word sequences with a sentence that is already picked.
- **Validation:** a hand-labelled set of good and poor context sentences must rank correctly with the score.
- If Tatoeba does not give 3 good sentences for a word, write the missing sentences.
- Keep the Tatoeba id of each sentence. The README must say that the sentences come from Tatoeba, with a link.
- Keep the downloads (the Tatoeba file and the model) in the `.cache` folder. Do not commit them.
- **Links are an experiment:** `src/sentences/link.ts` puts a word into a bank sentence of a word with a similar meaning. A review on 2026-09-15 found that most links did not show the meaning, so the app does not use them. Do not use links in the app until a review of real links shows good results.

## Language: ASD-STE100

Use ASD-STE100 Simplified Technical English (STE) for all text.
This rule applies to:

- Replies to the user.
- Comments in the code.
- Commit messages.
- Documentation, which includes this file.
- Text in the user interface.

Obey these STE rules:

- Use only one instruction in each sentence.
- Use the imperative form for instructions. Example: "Run the tests."
- Use the active voice.
- Keep a procedural sentence to a maximum of 20 words.
- Keep a descriptive sentence to a maximum of 25 words.
- Use one word for one meaning. Do not use synonyms for the same thing.
- Use the approved STE words when possible.
- Use technical names and technical verbs from this project when necessary.
- Do not use phrasal verbs. Example: write "start", not "start up".
- Write "must" for a requirement. Do not write "should" for a requirement.

## Commits: Conventional Commits

Use the Conventional Commits format for each commit message.
The format is `<type>(<optional scope>): <description>`.

Use these types:

- `feat`: A new feature.
- `fix`: A correction to a defect.
- `docs`: A change to the documentation only.
- `style`: A change to the format only. The behavior does not change.
- `refactor`: A change to the code structure. The behavior does not change.
- `test`: A new test or a change to a test.
- `build`: A change to the build system or to the dependencies.
- `ci`: A change to the CI configuration.
- `chore`: Other maintenance work.
- `revert`: A revert of a previous commit.

Write the description in STE.
Write the description in lowercase.
Do not put a full stop at the end of the description.

## Workflow: trunk-based development

This project uses trunk-based development only.

- Commit directly to `main`.
- Do not make feature branches.
- Do not make pull requests.
- Push each commit to `origin/main` immediately.
- Keep each commit small.
- Make sure that each commit keeps `main` in a working condition.

### CI and deploy

Each push to `main` starts the `CI and deploy` workflow in `.github/workflows/deploy.yml`.
The workflow runs the lint checks, the type checks, the unit tests, the build and the smoke tests.
It deploys to GitHub Pages only when all these steps pass.

After the deploy, the `verify-deployment` job tests the live site:

1. It waits until the live HTML has `<meta name="app-version">` with the commit SHA.
2. It runs all the Playwright smoke tests against the live site, with `EXPECTED_APP_VERSION` set to the commit SHA.

The app also has a hidden element with `data-testid="app-version"`. The smoke test "has the expected build version" reads it.

To run the smoke tests against the live site from your computer, use this command:

```bash
BASE_URL=https://natfarleydev.github.io/spelling-trainer/ EXPECTED_APP_VERSION=$(git rev-parse origin/main) npm run test:e2e
```

A smoke test must operate against a local build and against the live site. Do not write a smoke test that only operates locally.

After each push, monitor the workflow in the background:

```bash
gh run watch --exit-status $(gh run list --branch main --limit 1 --json databaseId --jq '.[0].databaseId')
```

If the workflow fails, fix forward immediately.

### Fix forward

If a push causes a defect, fix forward:

1. Make a new commit that corrects the defect.
2. If a correction is not fast, revert the bad commit with `git revert`.
3. Push the new commit immediately.

Do not rewrite the history of `main`.
Do not use `git push --force` on `main`.

## GitHub

Use the GitHub CLI (`gh`) for GitHub tasks. Examples: the Pages settings and the CI runs.
