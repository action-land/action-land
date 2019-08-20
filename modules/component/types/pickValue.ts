/**
 * Extracts values of the provided keys
 */
export type PP<O, K> = K extends keyof O ? O[K] : never
