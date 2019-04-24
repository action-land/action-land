import {isAction} from './isAction'
import {INilAction, NIL_TYPE} from './nil'

/**
 * Checks if the object is {Nil} or not
 * @param: Object to test
 */
export function isNil(obj: unknown): obj is INilAction {
  return isAction(obj) && obj.type === NIL_TYPE
}
