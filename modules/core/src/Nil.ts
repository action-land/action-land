import {action, IAction} from './action'

/**
 * Action type for {Nil}
 */
export const NIL_TYPE = '@@NIL'

/**
 * Returns a Nil object
 */
export function Nil(): IAction<{}> {
  return action(NIL_TYPE, {})
}
