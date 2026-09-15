import { describe, expect, it } from 'vitest'
import { isTrueTypeFont } from './fontFile'

const bytes = (...values: number[]) => new Uint8Array(values)
const text = (value: string) => new TextEncoder().encode(value)

describe('isTrueTypeFont', () => {
  it('accepts the TrueType signature 0x00010000', () => {
    expect(isTrueTypeFont(bytes(0, 1, 0, 0, 0, 20, 1, 0))).toBe(true)
  })

  it('accepts the Apple TrueType signature "true"', () => {
    expect(isTrueTypeFont(text('true0000'))).toBe(true)
  })

  it.each([
    // A server can answer with an HTML page instead of a missing file, with the status 200.
    ['an HTML page', text('<!doctype html><html>')],
    // jsPDF can embed only TrueType outlines.
    ['an OpenType font with CFF outlines', text('OTTO0000')],
    ['a WOFF2 font', text('wOF20000')],
    ['an empty file', bytes()],
    ['a file that is shorter than the signature', bytes(0, 1, 0)],
  ])('rejects %s', (_, data) => {
    expect(isTrueTypeFont(data)).toBe(false)
  })
})
