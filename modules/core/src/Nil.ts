import {Action, action} from './action'

type NIL = '@@NIL'

/**
 * Action type for {Nil}
 * @constant
 */
export const NIL_TYPE: NIL = '@@NIL'

export interface NilAction extends Action<any, any> {
  type: '@@NIL'
  value: {}
}

/**
 * Returns a Nil object
 * @function
 * @returns {Action}
 */
export function Nil(): NilAction {
  return action(NIL_TYPE, {})
}
