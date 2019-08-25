/**
 * Overwrite the props in T with props in S.
 * @typeparam T Base object
 * @typeparam S New object
 * @category ComponentNext
 */
export type mergeProps<T, S> = Omit<T, keyof S> & S