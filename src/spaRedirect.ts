// GitHub Pages has no server routes. For an unknown path, it serves 404.html.
// 404.html sends the browser to the base path, with the original path in a query parameter.
// Then the app restores the original path before it starts.

export const REDIRECT_PARAM = 'redirect'

type RedirectLocation = {
  readonly pathname: string
  readonly search: string
  readonly hash: string
}

// Give the URL that 404.html must go to.
export const redirectTarget = ({ pathname, search, hash }: RedirectLocation, base: string): string =>
  pathname.startsWith(base)
    ? `${base}?${REDIRECT_PARAM}=${encodeURIComponent(pathname.slice(base.length) + search + hash)}`
    : base

// Give the original path, or null when there is no redirect.
// The result always starts with the base, so that the app cannot go to a different site.
export const restoredPath = ({ search }: Pick<RedirectLocation, 'search'>, base: string): string | null => {
  const target = new URLSearchParams(search).get(REDIRECT_PARAM)
  return target ? base + target.replace(/^\/+/, '') : null
}
