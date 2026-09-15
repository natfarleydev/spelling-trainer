// The first four bytes of a TrueType font file: the version 0x00010000, or "true" for an Apple TrueType font.
// jsPDF can embed only TrueType outlines, so an OpenType font with CFF outlines ("OTTO") is not acceptable.
const TRUE_TYPE_SIGNATURES: readonly (readonly number[])[] = [
  [0x00, 0x01, 0x00, 0x00],
  [0x74, 0x72, 0x75, 0x65],
]

// Give true when the bytes start with a TrueType font signature.
// A server can answer with an HTML page and the status 200 instead of a font file, so the status alone is not sufficient.
export const isTrueTypeFont = (bytes: Uint8Array): boolean =>
  bytes.length >= 4 && TRUE_TYPE_SIGNATURES.some((signature) => signature.every((value, i) => bytes[i] === value))
