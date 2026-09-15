export type Route =
  | { readonly name: 'home' }
  // The slide number starts at 1. It is null when the path has no slide number.
  | { readonly name: 'presentation'; readonly id: string; readonly slide: number | null }
  | { readonly name: 'notFound' }

const NOT_FOUND: Route = { name: 'notFound' }

// A positive whole number with no leading zero.
const SLIDE_NUMBER = /^[1-9]\d*$/

const safeDecode = (text: string): string | null => {
  try {
    return decodeURIComponent(text)
  } catch {
    return null
  }
}

// Find the route for a path. The base is the path where the app starts, with a slash at the end.
export const parseRoute = (pathname: string, base: string): Route => {
  if (pathname === base || pathname === base.replace(/\/$/, '')) return { name: 'home' }
  if (!pathname.startsWith(base)) return NOT_FOUND

  const [section, encodedId, slide, ...rest] = pathname.slice(base.length).split('/')
  if (section !== 'presentations' || !encodedId || rest.length > 0) return NOT_FOUND

  const id = safeDecode(encodedId)
  if (id === null) return NOT_FOUND
  if (slide === undefined || slide === '') return { name: 'presentation', id, slide: null }
  return SLIDE_NUMBER.test(slide) ? { name: 'presentation', id, slide: Number(slide) } : NOT_FOUND
}

export const homePath = (base: string): string => base

export const presentationPath = (base: string, id: string, slide: number): string =>
  `${base}presentations/${encodeURIComponent(id)}/${slide}`
