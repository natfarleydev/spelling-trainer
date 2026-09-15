import { describe, expect, it } from 'vitest'
import { cosineSimilarity, decodeWordVectors, encodeWordVectors, nearestWords, quantize } from './wordVectors'

describe('quantize', () => {
  it('maps the largest absolute value to 127 or -127', () => {
    const { values } = quantize([0.5, -2, 1])
    expect(Array.from(values)).toEqual([32, -127, 64])
  })

  it('gives a scale that converts the values back with a small error', () => {
    const vector = [0.123, -0.987, 0.5, 0]
    const { scale, values } = quantize(vector)
    Array.from(values).forEach((value, i) => {
      expect(Math.abs(value * scale - vector[i])).toBeLessThanOrEqual(scale / 2 + 1e-12)
    })
  })

  it('gives a scale of 0 and values of 0 for a zero vector', () => {
    const { scale, values } = quantize([0, 0, 0])
    expect(scale).toBe(0)
    expect(Array.from(values)).toEqual([0, 0, 0])
  })
})

describe('cosineSimilarity', () => {
  it('gives 1 for vectors in the same direction', () => {
    expect(cosineSimilarity([1, 2, 3], [2, 4, 6])).toBeCloseTo(1, 10)
  })

  it('gives -1 for vectors in opposite directions', () => {
    expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1, 10)
  })

  it('gives 0 for perpendicular vectors', () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0, 10)
  })

  it('gives 0, not NaN, when a vector is zero', () => {
    expect(cosineSimilarity([0, 0], [1, 1])).toBe(0)
  })
})

const entries = [
  { word: 'cat', vector: [0.1, 0.2, -0.3] },
  { word: 'dog', vector: [0.1, 0.25, -0.2] },
  { word: 'parliament', vector: [-0.4, 0.1, 0.9] },
]

describe('encodeWordVectors and decodeWordVectors', () => {
  const vectors = decodeWordVectors(encodeWordVectors(entries))

  it('keep the words, the number of dimensions and the direction of each vector', () => {
    expect(vectors.words).toEqual(['cat', 'dog', 'parliament'])
    expect(vectors.dimensions).toBe(3)
    entries.forEach(({ word, vector }) => {
      expect(cosineSimilarity(vectors.vector(word)!, vector)).toBeGreaterThan(0.999)
    })
  })

  it('find a word without regard to capital letters and spaces', () => {
    expect(vectors.vector(' Cat ')).toEqual(vectors.vector('cat'))
  })

  it('give undefined for an unknown word', () => {
    expect(vectors.vector('unknown')).toBeUndefined()
  })

  it('reject a file that is not a word vector file', () => {
    expect(() => decodeWordVectors(new TextEncoder().encode('<!doctype html><title>Not vectors</title>'))).toThrow()
  })

  it('reject a file that is too short', () => {
    expect(() => decodeWordVectors(encodeWordVectors(entries).subarray(0, 20))).toThrow()
  })

  it('reject vectors with different numbers of dimensions', () => {
    expect(() =>
      encodeWordVectors([
        { word: 'a', vector: [1, 2] },
        { word: 'b', vector: [1] },
      ]),
    ).toThrow()
  })

  it('reject a word with a line break or an empty word', () => {
    expect(() => encodeWordVectors([{ word: 'a\nb', vector: [1] }])).toThrow()
    expect(() => encodeWordVectors([{ word: '', vector: [1] }])).toThrow()
  })

  it('use one byte for each value of a vector', () => {
    const many = Array.from({ length: 100 }, (_, i) => ({ word: `w${i}`, vector: Array.from({ length: 50 }, () => i) }))
    // 100 words × 50 values as float32 would be 20,000 bytes.
    expect(encodeWordVectors(many).byteLength).toBeLessThan(20_000 * 0.35)
  })
})

describe('nearestWords', () => {
  const vectors = decodeWordVectors(encodeWordVectors(entries))

  it('gives the candidates in order of similarity, without the word itself', () => {
    expect(nearestWords(vectors, 'cat', ['parliament', 'dog', 'cat'], 5).map((match) => match.word)).toEqual([
      'dog',
      'parliament',
    ])
  })

  it('gives a maximum number of matches', () => {
    expect(nearestWords(vectors, 'cat', ['dog', 'parliament'], 1)).toHaveLength(1)
  })

  it('ignores a candidate that has no vector', () => {
    expect(nearestWords(vectors, 'cat', ['unknown', 'dog'], 5).map((match) => match.word)).toEqual(['dog'])
  })

  it('gives no matches for a word that has no vector', () => {
    expect(nearestWords(vectors, 'unknown', ['dog'], 5)).toEqual([])
  })

  it('gives the similarity of each match', () => {
    const [match] = nearestWords(vectors, 'cat', ['dog'], 1)
    expect(match.similarity).toBeCloseTo(cosineSimilarity(vectors.vector('cat')!, vectors.vector('dog')!), 10)
  })
})
