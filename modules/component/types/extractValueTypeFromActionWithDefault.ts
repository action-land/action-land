import {LActionValueForType} from './extractValueTypeFromAction'

/**
 * Infer type of values from action union type given action type's type with fallback type
 *
 * ```typescript
 * import {Action} from '@action-land/core'
 *
 * LActionValueForTypeWithDefault<Action<10, 'a'> | Action<{count: 10}, 'b'>, 'c', 'default'> // outputs  'default'
 * ```
 *
 * @typeparam A Union type of Actions
 * @typeparam T Type of action for which value is to be inferred
 * @typeparam D Fallback type if type T is not present in A set
 * @category ComponentNext
 */
export type LActionValueForTypeWithDefault<A, T, D> = LActionValueForType<
  A,
  T
> extends never
  ? D
  : LActionValueForType<A, T>
