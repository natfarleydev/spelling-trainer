import { describe, expect, it } from 'vitest'
import { keyToAction, nextIndex, previousIndex } from './navigation'

describe('keyToAction', () => {
  it.each(['ArrowRight', 'ArrowDown', 'PageDown', ' '])('gives "next" for the %j key', (key) => {
    expect(keyToAction(key)).toBe('next')
  })

  it.each(['ArrowLeft', 'ArrowUp', 'PageUp'])('gives "previous" for the %j key', (key) => {
    expect(keyToAction(key)).toBe('previous')
  })

  // The Escape key must not close the presentation by accident.
  it.each(['Escape', 'a'])('gives null for the %j key', (key) => {
    expect(keyToAction(key)).toBeNull()
  })
})

describe('nextIndex', () => {
  it('moves to the next slide', () => {
    expect(nextIndex(0, 10)).toBe(1)
  })

  it('stays on the last slide', () => {
    expect(nextIndex(9, 10)).toBe(9)
  })

  it('stays on 0 when the deck is empty', () => {
    expect(nextIndex(0, 0)).toBe(0)
  })
})

describe('previousIndex', () => {
  it('moves to the previous slide', () => {
    expect(previousIndex(3)).toBe(2)
  })

  it('stays on the first slide', () => {
    expect(previousIndex(0)).toBe(0)
  })
})
