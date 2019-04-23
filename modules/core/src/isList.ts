import {Action} from './action'
import {isAction} from './isAction'
import {LIST_ACTION_TYPE} from './List'

/**
 * Checks if the object is of type List
 * @param: Object to test
 */
export function isList(obj: any): obj is Action<any[]> {
  return isAction(obj) && obj.type === LIST_ACTION_TYPE
}
