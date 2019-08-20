import {Action} from '@action-land/core'

/**
 * infers type of action type provided action or action set
 */
export type LActionTypes<A> = A extends Action<any, infer T> ? T : never
