import {Action} from './action'
import {isAction} from './isAction'
import {NIL_TYPE} from './Nil'

/**
 * Checks if the object is {Nil} or not
 * @param: Object to test
 */
export function isNil(obj: any): obj is Action<any> {
  return isAction(obj) && obj.type === NIL_TYPE
}
