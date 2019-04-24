import {IAction} from './action'
import {isAction} from './isAction'
import {LIST_ACTION_TYPE} from './list'

/**
 * Checks if the object is of type List
 * @param: Object to test
 */
export function isList(obj: unknown): obj is IAction<unknown[]> {
  return isAction(obj) && obj.type === LIST_ACTION_TYPE
}
