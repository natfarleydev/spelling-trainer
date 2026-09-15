// The slide background colours of the style guide, in order. Each name has a --slide-<name> token in src/index.css.
export const SLIDE_COLOURS = ['cream', 'sky', 'mint', 'lilac', 'peach'] as const

export type SlideColour = (typeof SLIDE_COLOURS)[number]

// Give the background colour for a slide index. The colours start again after the last colour.
export const slideColour = (index: number): SlideColour => {
  const count = SLIDE_COLOURS.length
  return SLIDE_COLOURS[((Math.floor(index) % count) + count) % count]
}
