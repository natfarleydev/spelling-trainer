import 'fake-indexeddb/auto'
import { createStore, set } from 'idb-keyval'
import { describe, expect, it } from 'vitest'
import { createPresentation } from './presentation'
import { createIdbStore, createMemoryStore, PRESENTATIONS_STORE_NAME, type PresentationStore } from './presentationStore'

const older = createPresentation({ id: 'a', createdAt: '2026-09-01T10:00:00.000Z', words: ['because'] })
const newer = createPresentation({ id: 'b', createdAt: '2026-09-02T10:00:00.000Z', words: ['friend'] })

// Each test gets a new database, so that the tests stay isolated.
const newDatabaseName = () => `test-${crypto.randomUUID()}`

describe.each<[string, () => PresentationStore]>([
  ['the IndexedDB store', () => createIdbStore(newDatabaseName())],
  ['the memory store', () => createMemoryStore()],
])('%s', (_, makeStore) => {
  it('gives undefined for an unknown id', async () => {
    expect(await makeStore().get('unknown')).toBeUndefined()
  })

  it('gives a saved presentation', async () => {
    const store = makeStore()
    await store.save(older)
    expect(await store.get('a')).toEqual(older)
  })

  it('replaces a presentation that has the same id', async () => {
    const store = makeStore()
    await store.save(older)
    const changed = { ...older, words: ['changed'] }
    await store.save(changed)
    expect(await store.get('a')).toEqual(changed)
  })

  it('lists all the saved presentations, newest first', async () => {
    const store = makeStore()
    await store.save(older)
    await store.save(newer)
    expect(await store.list()).toEqual([newer, older])
  })

  it('gives an empty list when nothing is saved', async () => {
    expect(await makeStore().list()).toEqual([])
  })
})

describe('the IndexedDB store with data that is not a presentation', () => {
  const setUp = async () => {
    const name = newDatabaseName()
    const store = createIdbStore(name)
    await store.save(older)
    await set('bad', { some: 'data' }, createStore(name, PRESENTATIONS_STORE_NAME))
    return store
  }

  it('does not list the bad data', async () => {
    expect(await (await setUp()).list()).toEqual([older])
  })

  it('gives undefined for the bad data', async () => {
    expect(await (await setUp()).get('bad')).toBeUndefined()
  })
})
