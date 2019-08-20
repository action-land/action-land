/**
 * infers type of values from a {[key]: value } object
 * eg: LObjectValues<{a: string, b: number, c: 1}> ::  string | number | 1
 */
export type LObjectValues<O> = O extends {[k: string]: infer S} ? S : unknown
