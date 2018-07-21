import {Action} from './action'
import {NIL_TYPE} from './Nil'
import {isAction} from './isAction'

/**
 * Checks if the object is {Nil} or not
 * @function
 * @param {any} obj
 * @returns {boolean}
 */
export function isNil(obj: any): obj is Action<any> {
  return isAction(obj) && obj.type === NIL_TYPE
}
