# CLAUDE.md

This file gives instructions for work in this repository.

## Project goal

This project is a GitHub Pages app.
The user gives a list of 10 spelling words.
The app makes a presentation from these words.

GitHub Pages serves only static files.
Thus, the app must operate fully in the browser.

## Language: ASD-STE100

Use ASD-STE100 Simplified Technical English (STE) for all text.
This rule applies to:

- Replies to the user.
- Comments in the code.
- Commit messages.
- Documentation, which includes this file.

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

If a push causes a defect, fix forward:

1. Make a new commit that corrects the defect.
2. If a correction is not fast, revert the bad commit with `git revert`.
3. Push the new commit immediately.

Do not rewrite the history of `main`.
Do not use `git push --force` on `main`.
