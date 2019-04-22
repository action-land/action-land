import {Action, action} from './action'

/**
 * Action type for {Nil}
 * @constant
 */
export const NIL_TYPE = '@@NIL'

/**
 * Returns a Nil object
 * @function
 * @returns {Action}
 */
export function Nil(): Action<string, {}> {
  return action(NIL_TYPE, {})
}
