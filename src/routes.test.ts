import { describe, expect, it } from 'vitest'
import { homePath, parseRoute, presentationPath } from './routes'

const BASE = '/spelling-trainer/'

describe('parseRoute', () => {
  it('gives the home route for the base path', () => {
    expect(parseRoute('/spelling-trainer/', BASE)).toEqual({ name: 'home' })
  })

  it('gives the home route for the base path without the last slash', () => {
    expect(parseRoute('/spelling-trainer', BASE)).toEqual({ name: 'home' })
  })

  it('gives a presentation route with the slide number', () => {
    expect(parseRoute('/spelling-trainer/presentations/k3x9/3', BASE)).toEqual({
      name: 'presentation',
      id: 'k3x9',
      slide: 3,
    })
  })

  it.each(['/spelling-trainer/presentations/k3x9', '/spelling-trainer/presentations/k3x9/'])(
    'gives a presentation route with no slide number for %s',
    (pathname) => {
      expect(parseRoute(pathname, BASE)).toEqual({ name: 'presentation', id: 'k3x9', slide: null })
    },
  )

  it('decodes the presentation id', () => {
    expect(parseRoute('/spelling-trainer/presentations/a%20b/1', BASE)).toMatchObject({ id: 'a b' })
  })

  it.each([
    '/spelling-trainer/presentations/k3x9/0',
    '/spelling-trainer/presentations/k3x9/-1',
    '/spelling-trainer/presentations/k3x9/abc',
    '/spelling-trainer/presentations/k3x9/2.5',
    '/spelling-trainer/presentations/k3x9/03',
    '/spelling-trainer/presentations/k3x9/3/extra',
    '/spelling-trainer/presentations',
    '/spelling-trainer/presentations/',
    '/spelling-trainer/other',
    '/other/',
    '/',
  ])('gives the not-found route for %s', (pathname) => {
    expect(parseRoute(pathname, BASE)).toEqual({ name: 'notFound' })
  })
})

describe('presentationPath', () => {
  it('makes the path of a slide', () => {
    expect(presentationPath(BASE, 'k3x9', 3)).toBe('/spelling-trainer/presentations/k3x9/3')
  })

  it('encodes the presentation id', () => {
    expect(presentationPath(BASE, 'a b', 1)).toBe('/spelling-trainer/presentations/a%20b/1')
  })

  it('makes a path that parseRoute can read', () => {
    expect(parseRoute(presentationPath(BASE, 'a/b c', 7), BASE)).toEqual({
      name: 'presentation',
      id: 'a/b c',
      slide: 7,
    })
  })
})

describe('homePath', () => {
  it('gives the base path', () => {
    expect(homePath(BASE)).toBe('/spelling-trainer/')
  })
})
