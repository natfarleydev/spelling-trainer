import { describe, expect, it } from 'vitest'
import { clearDraft, loadDraft, saveDraft, type TextStorage } from './draft'

const memoryStorage = (): TextStorage => {
  const data = new Map<string, string>()
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
  }
}

const brokenStorage: TextStorage = {
  getItem: () => {
    throw new Error('blocked')
  },
  setItem: () => {
    throw new Error('full')
  },
  removeItem: () => {
    throw new Error('blocked')
  },
}

describe('draft', () => {
  it('gives an empty draft when nothing is saved', () => {
    expect(loadDraft(memoryStorage())).toBe('')
  })

  it('gives the saved draft', () => {
    const storage = memoryStorage()
    expect(saveDraft(storage, 'because\nfriend')).toBe(true)
    expect(loadDraft(storage)).toBe('because\nfriend')
  })

  it('clears the draft', () => {
    const storage = memoryStorage()
    saveDraft(storage, 'because')
    expect(clearDraft(storage)).toBe(true)
    expect(loadDraft(storage)).toBe('')
  })

  it('gives an empty draft when the storage fails', () => {
    expect(loadDraft(brokenStorage)).toBe('')
  })

  it('gives false and does not throw when the storage cannot save or clear', () => {
    expect(saveDraft(brokenStorage, 'because')).toBe(false)
    expect(clearDraft(brokenStorage)).toBe(false)
  })
})
