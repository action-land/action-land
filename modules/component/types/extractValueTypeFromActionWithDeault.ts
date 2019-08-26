import {LActionValueForType} from './extractValueTypeFromAction'

/**
 * infers type of values from action set given action type's type
 * @typeparam A Set of actions
 * @typeparam T Type of action for which value type is to be inferred
 * @typeparam D Fallback type if type T is not present in A set
 * ```typescript
 * import {Action} from '@action-land/core'
 *
 * LActionValueForTypeWithDefault<Action<10, 'a'> | Action<{count: 10}, 'b'>, 'c', 'default'> // outputs  'default'
 * ```
 * @category ComponentNext
 */
export type LActionValueForTypeWithDefault<A, T, D> = LActionValueForType<
  A,
  T
> extends never
  ? D
  : LActionValueForType<A, T>
