export const hasOwnProperty = <K extends string | number>(
  k: K,
  a: unknown
): a is {[s in K]: unknown} =>
  typeof a === 'object' && a !== null && a.hasOwnProperty(k)
