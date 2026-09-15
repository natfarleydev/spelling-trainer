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
