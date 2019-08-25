import {Action} from '@action-land/core'

/**
 * Infers type of action type provided action or action set
 * @typeparam A Action set
 * ```typescript
 * LActionTypes<Action<10, 't1'> | Action<20, 't2'>> // outputs 't1' | 't2'
 * ```
 * @category ComponentNext
 */
export type LActionTypes<A> = A extends Action<any, infer T> ? T : never
