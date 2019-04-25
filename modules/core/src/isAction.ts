import {hasOwnProperty} from '../../utils'

import {IAction, IActionType} from './action'

/**
 * Checks if the object is of Action type
 * @param: Any Object
 */
export function isAction<K extends IActionType>(
  obj: unknown
): obj is IAction<K, unknown> {
  return (
    hasOwnProperty('type', obj) &&
    hasOwnProperty('value', obj) &&
    (typeof obj.type === 'string' || typeof obj.type === 'number')
  )
}
