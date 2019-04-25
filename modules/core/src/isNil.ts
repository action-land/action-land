import {isAction} from './isAction'
import {INilAction, NIL} from './nil'

/**
 * Checks if the object is {Nil} or not
 * @param: Object to test
 */
export const isNil = (obj: unknown): obj is INilAction =>
  isAction(obj) && obj.type === NIL
