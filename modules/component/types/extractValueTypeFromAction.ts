import {Action} from '@action-land/core'

/**
 * infers type of values from action set given action type's type
 * eg: LActionValueForType<Action<10, 'a'> | Action<'text', 'b'>, 'b'> :: string
 */
export type LActionValueForType<A, T> = A extends Action<infer V, T> ? V : never
