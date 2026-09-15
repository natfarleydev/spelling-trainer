// Read the custom properties of the first :root block of a CSS file. The palette test uses this to check the tokens.
export const readRootVariables = (css: string): ReadonlyMap<string, string> => {
  const block = /:root\s*\{([^}]*)\}/.exec(css)
  if (!block) return new Map()
  return new Map([...block[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]))
}
