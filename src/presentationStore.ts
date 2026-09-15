import { createStore, get, set, values } from 'idb-keyval'
import { isPresentation, sortNewestFirst, type Presentation } from './presentation'

export const PRESENTATIONS_DATABASE_NAME = 'spelling-trainer'
export const PRESENTATIONS_STORE_NAME = 'presentations'

export type PresentationStore = {
  readonly save: (presentation: Presentation) => Promise<void>
  // Give undefined when there is no presentation with this id, or when the stored data is not correct.
  readonly get: (id: string) => Promise<Presentation | undefined>
  // Give the presentations newest first. Ignore stored data that is not correct.
  readonly list: () => Promise<readonly Presentation[]>
}

// Keep the presentations in IndexedDB in the browser.
export const createIdbStore = (databaseName: string = PRESENTATIONS_DATABASE_NAME): PresentationStore => {
  const store = createStore(databaseName, PRESENTATIONS_STORE_NAME)
  return {
    save: (presentation) => set(presentation.id, presentation, store),
    get: async (id) => {
      const value = await get<unknown>(id, store)
      return isPresentation(value) ? value : undefined
    },
    list: async () => sortNewestFirst((await values<unknown>(store)).filter(isPresentation)),
  }
}

// Keep the presentations in memory. The component tests use this store.
export const createMemoryStore = (initial: readonly Presentation[] = []): PresentationStore => {
  let presentations: ReadonlyMap<string, Presentation> = new Map(initial.map((p) => [p.id, p]))
  return {
    save: async (presentation) => {
      presentations = new Map(presentations).set(presentation.id, presentation)
    },
    get: async (id) => presentations.get(id),
    list: async () => sortNewestFirst([...presentations.values()]),
  }
}
