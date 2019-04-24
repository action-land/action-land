import {hasOwnProperty} from '../../utils'

import {IAction} from './action'

/**
 * Checks if the object is of Action type
 * @param: Any Object
 */
export function isAction(obj: unknown): obj is IAction<unknown> {
  return (
    hasOwnProperty('type', obj) &&
    hasOwnProperty('value', obj) &&
    (typeof obj.type === 'string' || typeof obj.type === 'number')
  )
}
