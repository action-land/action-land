import {Action} from './action'

/**
 * Checks if the object is of Action type
 * TODO(tsc): Improve typings with overrides
 * @param: Any Object
 */
export function isAction(obj: any): obj is Action<any> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.hasOwnProperty('type') &&
    obj.hasOwnProperty('value') &&
    (typeof obj.type === 'string' || typeof obj.type === 'number')
  )
}
