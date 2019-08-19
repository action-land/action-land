import {Action} from './action'
import {LIST_ACTION_TYPE} from './list'

/**
 * Checks if the object is of type List
 * @function
 * @param {any} obj
 * @returns {boolean}
 */
export function isList(obj: any): obj is Action<Array<any>> {
  return (
    Action.isAction(obj) && !Action.isNil(obj) && obj.type === LIST_ACTION_TYPE
  )
}
