import { slideColour, type SlideColour } from './slideColours'

// A copy of the colour tokens in src/index.css, for code that cannot use CSS, for example the PDF and PPTX downloads.
// src/theme/tokens.test.ts makes sure that this copy is the same as the CSS.
export const COLOURS = {
  paper: '#FFFBF2',
  ink: '#1F2544',
  inkSoft: '#4A4F6A',
  line: '#E6DCC8',
  lineStrong: '#8A8069',
  primary: '#2657D4',
  primaryDark: '#1B3F9E',
  onPrimary: '#FFFFFF',
  sunshine: '#FFC83D',
  coral: '#FF6F59',
  mint: '#3CCB9F',
  grape: '#8B6FE8',
  danger: '#B42318',
  success: '#11785A',
} as const

export const SLIDE_BACKGROUNDS: Readonly<Record<SlideColour, string>> = {
  cream: '#FFF4D6',
  sky: '#DDF0FF',
  mint: '#DDF7EC',
  lilac: '#EDE6FF',
  peach: '#FFE4DC',
}

// Give the background colour for a slide index. The colours start again after the last colour.
export const slideBackground = (index: number): string => SLIDE_BACKGROUNDS[slideColour(index)]
