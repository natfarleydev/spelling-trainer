// The colour pairs that the style guide requires. src/theme/palette.test.ts checks each pair in src/index.css.
// The minimums come from WCAG 2.x: 4.5 for text, 3 for control borders and focus rings.
// The slide pairs use 7, because a projector in a bright classroom decreases contrast.

export type ContrastPair = {
  readonly foreground: string
  readonly background: string
  readonly minimum: number
}

const SLIDE_BACKGROUNDS = ['--slide-cream', '--slide-sky', '--slide-mint', '--slide-lilac', '--slide-peach']

export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  { foreground: '--ink', background: '--paper', minimum: 4.5 },
  { foreground: '--ink-soft', background: '--paper', minimum: 4.5 },
  { foreground: '--on-primary', background: '--primary', minimum: 4.5 },
  { foreground: '--on-primary', background: '--primary-dark', minimum: 4.5 },
  { foreground: '--primary', background: '--paper', minimum: 4.5 },
  { foreground: '--ink', background: '--sunshine', minimum: 4.5 },
  { foreground: '--ink', background: '--coral', minimum: 4.5 },
  { foreground: '--ink', background: '--mint', minimum: 4.5 },
  { foreground: '--danger', background: '--paper', minimum: 4.5 },
  { foreground: '--success', background: '--paper', minimum: 4.5 },
  { foreground: '--line-strong', background: '--paper', minimum: 3 },
  { foreground: '--ink', background: '--paper', minimum: 3 },
  ...SLIDE_BACKGROUNDS.flatMap((background) => [
    { foreground: '--ink', background, minimum: 7 },
    { foreground: '--ink-soft', background, minimum: 4.5 },
    { foreground: '--primary', background, minimum: 4.5 },
  ]),
]
