import {Action, action} from './action'

/**
 * Action type for {Nil}
 */
export const NIL_TYPE = '@@NIL'

/**
 * Returns a Nil object
 */
export function Nil(): Action<{}> {
  return action(NIL_TYPE, {})
}
