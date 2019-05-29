import {Action, action} from './action'

/**
 * Action type for {Nil}
 * @constant
 * @type {Action}
 */
export const NIL_TYPE = '@@NIL'

/**
 * Returns a Nil object
 * @function
 * @returns {Action}
 */
export function Nil(): Action<{}> {
  return action(NIL_TYPE, {})
}
