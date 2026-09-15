import { describe, expect, it } from 'vitest'
import { redirectTarget, restoredPath } from './spaRedirect'

const BASE = '/spelling-trainer/'

describe('redirectTarget', () => {
  it('puts the path after the base into a query parameter', () => {
    expect(redirectTarget({ pathname: '/spelling-trainer/presentations/k3x9/3', search: '', hash: '' }, BASE)).toBe(
      '/spelling-trainer/?redirect=presentations%2Fk3x9%2F3',
    )
  })

  it('keeps the query and the hash', () => {
    expect(
      redirectTarget({ pathname: '/spelling-trainer/presentations/k3x9/3', search: '?a=1&b=2', hash: '#x' }, BASE),
    ).toBe(`/spelling-trainer/?redirect=${encodeURIComponent('presentations/k3x9/3?a=1&b=2#x')}`)
  })

  it('gives the base when the path is not under the base', () => {
    expect(redirectTarget({ pathname: '/other/page', search: '', hash: '' }, BASE)).toBe(BASE)
  })
})

describe('restoredPath', () => {
  it('gives the original path', () => {
    expect(restoredPath({ search: '?redirect=presentations%2Fk3x9%2F3' }, BASE)).toBe(
      '/spelling-trainer/presentations/k3x9/3',
    )
  })

  it.each(['', '?a=1', '?redirect='])('gives null when the query is %j', (search) => {
    expect(restoredPath({ search }, BASE)).toBeNull()
  })

  it('restores the path, the query and the hash that redirectTarget saves', () => {
    const original = { pathname: '/spelling-trainer/presentations/k3x9/3', search: '?a=1&b=2', hash: '#x' }
    const target = new URL(redirectTarget(original, BASE), 'https://example.test')
    expect(restoredPath({ search: target.search }, BASE)).toBe('/spelling-trainer/presentations/k3x9/3?a=1&b=2#x')
  })

  it('always gives a path under the base', () => {
    expect(restoredPath({ search: `?redirect=${encodeURIComponent('//example.com/x')}` }, BASE)).toMatch(/^\/spelling-trainer\//)
  })
})
