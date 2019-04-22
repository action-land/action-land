import {Action} from './action'
import {isAction} from './isAction'
import {NIL_TYPE} from './Nil'

/**
 * Checks if the object is {Nil} or not
 * @function
 * @param {any} obj
 * @returns {boolean}
 */
export function isNil(obj: any): obj is Action<any, any> {
  return isAction(obj) && obj.type === NIL_TYPE
}
