import {Action} from '@action-land/core'

/**
 * Infer type of action for given action or action union type
 *
 * ```typescript
 * import {Action} from '@action-land/core'
 *
 * LActionTypes<Action<10, 't1'> | Action<20, 't2'>> // outputs 't1' | 't2'
 * ```
 * @typeparam A Action union type
 * @category ComponentNext
 */
export type LActionTypes<A> = A extends Action<any, infer T> ? T : never
