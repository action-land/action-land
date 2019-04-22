import {isAction} from './isAction'
import {NIL_TYPE, NilAction} from './Nil'

/**
 * Checks if the object is {Nil} or not
 * @function
 * @param {any} obj
 * @returns {boolean}
 */
export function isNil(obj: any): obj is NilAction {
  return isAction(obj) && obj.type === NIL_TYPE
}
