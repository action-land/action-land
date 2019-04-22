import {isAction} from './isAction'
import {INilAction, NIL_TYPE} from './Nil'

/**
 * Checks if the object is {Nil} or not
 * @param: Object to test
 */
export function isNil(obj: any): obj is INilAction {
  return isAction(obj) && obj.type === NIL_TYPE
}
