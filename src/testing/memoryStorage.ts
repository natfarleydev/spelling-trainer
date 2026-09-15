import type { TextStorage } from '../draft'

// A Web Storage fake for the tests. It keeps the data in memory.
export const createMemoryStorage = (initial: Readonly<Record<string, string>> = {}): TextStorage => {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
  }
}

// A Web Storage fake that refuses all operations. Example: a private window with no storage.
export const brokenStorage: TextStorage = {
  getItem: () => {
    throw new Error('blocked')
  },
  setItem: () => {
    throw new Error('blocked')
  },
  removeItem: () => {
    throw new Error('blocked')
  },
}
