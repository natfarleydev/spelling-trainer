export type Rgb = readonly [number, number, number]

const HEX_COLOUR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

// Read a colour in the form "#RGB" or "#RRGGBB". Throw an error for a different form.
export const parseHexColour = (value: string): Rgb => {
  const match = HEX_COLOUR.exec(value.trim())
  if (!match) throw new Error(`Not a hex colour: ${JSON.stringify(value)}`)
  const hex = match[1].length === 3 ? [...match[1]].map((digit) => digit + digit).join('') : match[1]
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
}

// The sRGB to linear conversion from WCAG 2.x.
const linear = (channel: number): number => {
  const value = channel / 255
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

// The relative luminance from WCAG 2.x. It gives 0 for black and 1 for white.
export const relativeLuminance = (hex: string): number => {
  const [r, g, b] = parseHexColour(hex).map(linear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// The contrast ratio from WCAG 2.x. It gives a value from 1 to 21. The order of the colours does not matter.
export const contrastRatio = (first: string, second: string): number => {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}
