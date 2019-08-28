/**
 * Extracts values types of the provided key in an object
 * @typeparam O key-value object
 * @typeparam K key of object [O]
 * @return type of O[K]
 * @category ComponentNext
 */
export type PP<O, K> = K extends keyof O ? O[K] : never
