# Spelling trainer

[![CI and deploy](https://github.com/natfarleydev/spelling-trainer/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/natfarleydev/spelling-trainer/actions/workflows/deploy.yml)
[![Live site](https://img.shields.io/badge/live-GitHub%20Pages-2f5bd3?logo=github)](https://natfarleydev.github.io/spelling-trainer/)
[![Status: alpha](https://img.shields.io/badge/status-alpha-ffd400)](#status)
[![Licence: CC0 1.0](https://img.shields.io/badge/licence-CC0%201.0-lightgrey?logo=creativecommons)](LICENSE)
[![Word data: CC BY-SA 4.0](https://img.shields.io/badge/word%20data-CC%20BY--SA%204.0-lightgrey?logo=creativecommons)](#data)
[![English: British](https://img.shields.io/badge/English-British-012169)](#data)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fe5196?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/)
[![Trunk-based](https://img.shields.io/badge/workflow-trunk--based-0a7d5a)](CLAUDE.md#workflow-trunk-based-development)
[![Language: ASD-STE100](https://img.shields.io/badge/language-ASD--STE100-6f42c1)](CLAUDE.md#language-asd-ste100)

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Vitest](https://img.shields.io/badge/tested%20with-Vitest-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/smoke%20tests-Playwright-2ead33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Turborepo](https://img.shields.io/badge/cached%20with-Turborepo-ef4444?logo=turborepo&logoColor=white)](https://turborepo.com/)
[![TDD](https://img.shields.io/badge/TDD-mandatory-e34f26)](CLAUDE.md#testing-test-driven-development-tdd)

A teacher types 10 spelling words. The app makes a presentation from these words.

**Use the app:** https://natfarleydev.github.io/spelling-trainer/

## Status

The app is in alpha. The features and the data format can change.

The app can do these tasks now:

- Accept a maximum of 10 words, with one word on each line.
- Keep the typed words in the browser until the teacher clicks **Clear**. **Undo** puts the words back.
- Save each presentation in the browser (IndexedDB) and list the saved presentations on the home page.
- Show one large word on each slide. The URL has the slide number, for example `/presentations/k3x9/3`. Thus a reload or a bookmark keeps the slide.
- Show a short sentence with the word under test on each slide. For each word of the KS2 statutory lists (years 3 to 6), the sentence helps the child to understand the meaning of the word. For other words, the app gives a simple sentence and tells the teacher that it does not show the meaning. **New sentence** gives a different sentence, and **Word type** changes the type of the sentence.
- Use a friendly style for KS2 children: handwriting-style letters (Playpen Sans), a pastel colour for each slide, and the word under test underlined in the sentence. The style guide is in [CLAUDE.md](CLAUDE.md#style-guide).
- Download the slides as a PDF file (with the same fonts and colours as the screen) or as a PPTX file.

The app keeps presentations only in the browser where the teacher made them. The app has no server.

## Development

You must have Node.js 24.

```bash
npm ci
```

```bash
npm run dev
```

| Command | Result |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run test:watch` | Run the unit tests and the component tests after each change. |
| `npm run check` | Run the lint checks, the type checks and the tests, with the Turborepo cache. |
| `npm test` | Run the unit tests and the component tests one time. |
| `npm run test:e2e` | Make the production build and run the Playwright smoke tests. |
| `npm run build` | Do the type checks and make the production build. |

### Test the live site

After each deploy, CI runs the smoke tests against the live site. It first makes sure that the site has the new commit. You can also run the smoke tests against the live site:

```bash
BASE_URL=https://natfarleydev.github.io/spelling-trainer/ EXPECTED_APP_VERSION=$(git rev-parse origin/main) npm run test:e2e
```

To see the version of the live site, look for `<meta name="app-version">` in the page source.

Read [CLAUDE.md](CLAUDE.md) before you make a change. It has the rules for tests, code style, language, commits and deployment.

## Provenance

This section tells you where each part of this project comes from.

### Code

- The Claude Code AI agent wrote most of the code, and Nathanael Farley reviewed it. The `Co-Authored-By` lines in the commits show this.
- The build configuration started from the `react-ts` template of [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) (MIT).
- The `404.html` redirect for deep links on GitHub Pages uses the idea of [spa-github-pages](https://github.com/rafgraph/spa-github-pages) (MIT) by Rafael Pedicini. We wrote our own code for it in `src/spaRedirect.ts`.

### Runtime libraries

The app includes these libraries in the build that GitHub Pages serves.

| Library | Use | Licence |
| --- | --- | --- |
| [React](https://github.com/facebook/react) and React DOM | User interface | MIT |
| [jsPDF](https://github.com/parallax/jsPDF) | Makes the PDF file | MIT |
| [PptxGenJS](https://github.com/gitbrent/PptxGenJS) | Makes the PPTX file | MIT |
| [idb-keyval](https://github.com/jakearchibald/idb-keyval) | Keeps the presentations in IndexedDB | Apache-2.0 |
| [compromise](https://github.com/spencermountain/compromise) (`compromise/two`) | Finds the word type (noun, verb and more) for the sentences. The app loads it only when it makes sentences. | MIT |

The development tools are in `devDependencies` in [package.json](package.json). They are not in the build.

### Fonts

| Font | Use | Source | Licence |
| --- | --- | --- | --- |
| [Playpen Sans](https://github.com/TypeTogether/Playpen-Sans) by TypeTogether | Slides and page titles | [`@fontsource/playpen-sans`](https://fontsource.org/fonts/playpen-sans) for the pages. The static TTF files for the PDF download are copies of `fonts/ttf/PlaypenSans-Regular.ttf` and `PlaypenSans-Bold.ttf` from the TypeTogether repository, in [public/fonts/playpen-sans](public/fonts/playpen-sans) with the licence file. | SIL Open Font License 1.1 |
| [Andika](https://software.sil.org/andika/) by SIL International | Interface text | [`@fontsource/andika`](https://fontsource.org/fonts/andika) | SIL Open Font License 1.1 |
| Comic Sans MS | Text in the PPTX download | A system font on Windows and macOS. The app does not include it. | Not distributed |

The app hosts all its fonts. It does not load fonts from a third-party server.

### Data

| Data | Source and version | Licence | Our changes | File |
| --- | --- | --- | --- | --- |
| The first 1000 words of the New General Service List (the "simple words" for the sentences) | [NGSL 1.2](https://www.newgeneralservicelist.com/new-general-service-list), `NGSL_12_stats.csv`, SFI Rank 1 to 1000. Browne, C., Culligan, B., and Phillips, J. | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | We changed 9 American spellings to British spellings (for example, color to colour). | [src/sentences/ngslFirst1000.ts](src/sentences/ngslFirst1000.ts) |
| All 2,809 words of the New General Service List (**test data only**, not in the app: the "known words" for the sentence bank) | [NGSL 1.2](https://www.newgeneralservicelist.com/new-general-service-list), `NGSL_12_stats.csv`, SFI Rank 1 to 2809. Browne, C., Culligan, B., and Phillips, J. | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | We changed 30 American spellings to British spellings (for example, program to programme). | [src/sentences/ngsl.ts](src/sentences/ngsl.ts) |
| The sentence bank: 3 sentences for each word of the statutory word lists for years 3 to 6. Each sentence helps a child to understand the meaning of the word | Our own work. The tests check each sentence against the known words and the word vectors. | CC0 1.0 | Not applicable | [src/sentences/bank/](src/sentences/bank/) |
| The known word checker: the extra known words, the pronoun and number forms, and the rules that find a base form (for example, "drawings" gives "draw") | Our own work (**test data only**) | CC0 1.0 | Not applicable | [src/sentences/testing/knownWords.ts](src/sentences/testing/knownWords.ts) |
| The statutory word lists for years 3 to 6 (**test data only**, not in the app) | [English Appendix 1: Spelling](https://assets.publishing.service.gov.uk/media/5a7ccc06ed915d63cc65ce61/English_Appendix_1_-_Spelling.pdf), National curriculum in England, Department for Education | [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) | We wrote each optional form as a separate word (for example, "accident(ally)" gives "accident" and "accidentally"). | [src/sentences/testing/ks2StatutoryWords.ts](src/sentences/testing/ks2StatutoryWords.ts) |
| The sentence templates, the extra simple words, the inflected forms and the word type corrections | Our own work | CC0 1.0 | Not applicable | [src/sentences/](src/sentences/) |
| The common exception words for years 1 and 2 (**test data and build input only**, not in the app) | [English Appendix 1: Spelling](https://assets.publishing.service.gov.uk/media/5a7ccc06ed915d63cc65ce61/English_Appendix_1_-_Spelling.pdf), National curriculum in England, Department for Education | [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) | None | [src/sentences/testing/commonExceptionWords.ts](src/sentences/testing/commonExceptionWords.ts) |
| Word vectors for 20,013 words: the 20,000 most frequent GloVe words and all the words of the spelling lists | [GloVe 6B, 50 dimensions](https://nlp.stanford.edu/projects/glove/), from the copy `glove.6B.50d.zip` in [Zenodo record 4925376](https://zenodo.org/records/4925376) (MD5 `a6c8d6e1e52401e913e5f6fa137b1d53`) | [Public Domain Dedication and License v1.0](https://opendatacommons.org/licenses/pddl/1-0/) | We kept only these words, and we stored each value as one byte with a scale for each word. [scripts/buildWordVectors.ts](scripts/buildWordVectors.ts) makes the file again. | [public/data/word-vectors.bin](public/data/word-vectors.bin) |

Citation for the NGSL: Browne, C., Culligan, B. (2013). The New General Service List. Retrieved from https://www.newgeneralservicelist.com.

Citation for GloVe: Jeffrey Pennington, Richard Socher and Christopher D. Manning. 2014. GloVe: Global Vectors for Word Representation. https://nlp.stanford.edu/pubs/glove.pdf

Each data file starts with an SPDX licence line, the source and a list of our changes.

## Licence

[CC0 1.0 Universal](LICENSE). Third-party libraries and data keep their own licences, as the Provenance section shows.

Exception: [src/sentences/ngslFirst1000.ts](src/sentences/ngslFirst1000.ts) and [src/sentences/ngsl.ts](src/sentences/ngsl.ts) are adaptations of the NGSL, so they use [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
