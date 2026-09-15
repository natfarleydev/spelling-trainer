# Spelling trainer

[![CI and deploy](https://github.com/natfarleydev/spelling-trainer/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/natfarleydev/spelling-trainer/actions/workflows/deploy.yml)
[![Live site](https://img.shields.io/badge/live-GitHub%20Pages-2f5bd3?logo=github)](https://natfarleydev.github.io/spelling-trainer/)
[![Status: alpha](https://img.shields.io/badge/status-alpha-ffd400)](#status)
[![Licence: CC0 1.0](https://img.shields.io/badge/licence-CC0%201.0-lightgrey?logo=creativecommons)](LICENSE)
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
- Download the slides as a PDF file or a PPTX file.

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

The development tools are in `devDependencies` in [package.json](package.json). They are not in the build.

### Data

The app does not include word lists or other third-party data yet.
When we add data, this section will name the source, the version, the licence and the changes that we made.

## Licence

[CC0 1.0 Universal](LICENSE). Third-party libraries and data keep their own licences, as the Provenance section shows.
