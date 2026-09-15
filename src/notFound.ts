import { redirectTarget } from './spaRedirect'

// The imperative shell of 404.html. The logic is in spaRedirect.ts.
window.location.replace(redirectTarget(window.location, import.meta.env.BASE_URL))
