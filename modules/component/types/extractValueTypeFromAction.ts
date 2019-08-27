import {Action} from '@action-land/core'

/**
 * Infer type of values from action set given action type's type
 * 
 * ```typescript
 * import {Action} from '@action-land/core'
 *
 * LActionValueForType<Action<10, 'a'> | Action<{count: 10}, 'b'>, 'b'> // outputs  {count: string}
 * ```
 * @typeparam A set of actions
 * @typeparam T type of action for which value is to be inferred
 * @category ComponentNext
 */
export type LActionValueForType<A, T> = A extends Action<infer V, T> ? V : never
