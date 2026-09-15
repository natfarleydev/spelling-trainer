// The Web Storage methods that the draft functions use. localStorage has these methods.
export type TextStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export const DRAFT_KEY = 'spelling-trainer:draft'

// The browser can refuse storage. Example: a private window. Then the app must continue to operate.

export const loadDraft = (storage: TextStorage): string => {
  try {
    return storage.getItem(DRAFT_KEY) ?? ''
  } catch {
    return ''
  }
}

// Give true when the storage saved the draft.
export const saveDraft = (storage: TextStorage, text: string): boolean => {
  try {
    storage.setItem(DRAFT_KEY, text)
    return true
  } catch {
    return false
  }
}

// Give true when the storage removed the draft.
export const clearDraft = (storage: TextStorage): boolean => {
  try {
    storage.removeItem(DRAFT_KEY)
    return true
  } catch {
    return false
  }
}
