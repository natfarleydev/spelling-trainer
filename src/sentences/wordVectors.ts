// Word vectors link words that have a similar meaning. Example: "purred" is near "meowed".
// The app loads a compact file of vectors on demand. Each value uses one byte (int8) with a scale for each word.

export type WordVectors = {
  readonly dimensions: number
  readonly words: readonly string[]
  // Give the vector of a word, or undefined when the file has no vector for the word.
  readonly vector: (word: string) => Float32Array | undefined
}

export type Quantized = {
  readonly scale: number
  readonly values: Int8Array
}

export type WordVectorEntry = {
  readonly word: string
  readonly vector: ArrayLike<number>
}

export type Match = {
  readonly word: string
  readonly similarity: number
}

// The file format, little-endian:
// "SPWV", version (1 byte), 3 reserved bytes, count (uint32), dimensions (uint32), word bytes (uint32),
// then one float32 scale for each word, then the int8 values, then the words in UTF-8 with a line break between words.
const MAGIC = [0x53, 0x50, 0x57, 0x56]
const VERSION = 1
const HEADER_BYTES = 20

const lookupKey = (word: string): string => word.trim().toLowerCase()

// Convert a vector to int8 values and a scale. The largest absolute value becomes 127 or -127.
export const quantize = (vector: ArrayLike<number>): Quantized => {
  const values = Array.from(vector)
  const maxAbs = values.reduce((max, value) => Math.max(max, Math.abs(value)), 0)
  const scale = maxAbs / 127
  return {
    scale,
    values: Int8Array.from(values, (value) => (scale === 0 ? 0 : Math.max(-127, Math.min(127, Math.round(value / scale))))),
  }
}

export const cosineSimilarity = (a: ArrayLike<number>, b: ArrayLike<number>): number => {
  let dot = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return normA === 0 || normB === 0 ? 0 : dot / Math.sqrt(normA * normB)
}

export const encodeWordVectors = (entries: readonly WordVectorEntry[]): Uint8Array => {
  const dimensions = entries[0]?.vector.length ?? 0
  const seen = new Set<string>()
  for (const { word, vector } of entries) {
    if (word === '' || word.includes('\n')) throw new Error(`A word must not be empty or have a line break: ${JSON.stringify(word)}`)
    if (vector.length !== dimensions) throw new Error(`The vector of "${word}" has ${vector.length} dimensions, not ${dimensions}`)
    if (seen.has(lookupKey(word))) throw new Error(`The word "${word}" is in the list more than one time`)
    seen.add(lookupKey(word))
  }

  const wordBytes = new TextEncoder().encode(entries.map(({ word }) => word).join('\n'))
  const count = entries.length
  const bytes = new Uint8Array(HEADER_BYTES + count * 4 + count * dimensions + wordBytes.byteLength)
  const view = new DataView(bytes.buffer)

  bytes.set(MAGIC, 0)
  view.setUint8(4, VERSION)
  view.setUint32(8, count, true)
  view.setUint32(12, dimensions, true)
  view.setUint32(16, wordBytes.byteLength, true)

  entries.forEach(({ vector }, i) => {
    const { scale, values } = quantize(vector)
    view.setFloat32(HEADER_BYTES + i * 4, scale, true)
    bytes.set(new Uint8Array(values.buffer, values.byteOffset, values.byteLength), HEADER_BYTES + count * 4 + i * dimensions)
  })
  bytes.set(wordBytes, HEADER_BYTES + count * 4 + count * dimensions)
  return bytes
}

export const decodeWordVectors = (bytes: Uint8Array): WordVectors => {
  if (bytes.byteLength < HEADER_BYTES || !MAGIC.every((value, i) => bytes[i] === value)) {
    throw new Error('The file is not a word vector file')
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const version = view.getUint8(4)
  if (version !== VERSION) throw new Error(`The word vector file has version ${version}, not ${VERSION}`)

  const count = view.getUint32(8, true)
  const dimensions = view.getUint32(12, true)
  const wordByteLength = view.getUint32(16, true)
  const valuesStart = HEADER_BYTES + count * 4
  const wordsStart = valuesStart + count * dimensions
  if (bytes.byteLength < wordsStart + wordByteLength) throw new Error('The word vector file is too short')

  const words = count === 0 ? [] : new TextDecoder().decode(bytes.subarray(wordsStart, wordsStart + wordByteLength)).split('\n')
  if (words.length !== count) throw new Error('The word vector file has the wrong number of words')

  const scales = Float32Array.from({ length: count }, (_, i) => view.getFloat32(HEADER_BYTES + i * 4, true))
  const values = new Int8Array(bytes.buffer, bytes.byteOffset + valuesStart, count * dimensions)
  const indexOf = new Map(words.map((word, i) => [lookupKey(word), i]))

  return {
    dimensions,
    words,
    vector: (word) => {
      const index = indexOf.get(lookupKey(word))
      if (index === undefined) return undefined
      const scale = scales[index]
      return Float32Array.from(values.subarray(index * dimensions, (index + 1) * dimensions), (value) => value * scale)
    },
  }
}

// Give the candidates that are nearest in meaning to the word, most similar first.
// The result does not have the word itself or a candidate without a vector.
export const nearestWords = (
  vectors: WordVectors,
  word: string,
  candidates: readonly string[],
  limit: number,
): readonly Match[] => {
  const target = vectors.vector(word)
  if (!target) return []
  const key = lookupKey(word)
  return [...new Set(candidates)]
    .filter((candidate) => lookupKey(candidate) !== key)
    .flatMap((candidate) => {
      const vector = vectors.vector(candidate)
      return vector ? [{ word: candidate, similarity: cosineSimilarity(target, vector) }] : []
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
}
