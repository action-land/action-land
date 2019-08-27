/**
 * Infer type of values from a {[key]: value } object
 * @typeparam O key-value pair object
 * ```typescript
 * LObjectValues<{a: string, b: number, c: 1}> // outputs  string | number | 1
 * ```
 * @category ComponentNext
 */
export type LObjectValues<O> = O extends {[k: string]: infer S} ? S : unknown
