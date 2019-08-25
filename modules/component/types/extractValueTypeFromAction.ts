import {Action} from '@action-land/core'

/**
 * infers type of values from action set given action type's type
 * @typeparam A set of actions
 * @typeparam T type of action for which value type is to be inferred
 * ```typescript
 * LActionValueForType<Action<10, 'a'> | Action<{count: 10}, 'b'>, 'b'> // outputs  {count: string}
 * ```
 * @category ComponentNext
 */
export type LActionValueForType<A, T> = A extends Action<infer V, T> ? V : never
