import {IAction} from './action'

/**
 * Checks if the object is of Action type
 * @param: Any Object
 */
export function isAction(obj: any): obj is IAction<any> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.hasOwnProperty('type') &&
    obj.hasOwnProperty('value') &&
    (typeof obj.type === 'string' || typeof obj.type === 'number')
  )
}
