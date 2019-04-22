import {Action} from './action'

/**
 * Checks if the object is of Action type
 * @function
 * @param {any} obj
 * @returns {boolean}
 */
export function isAction(obj: any): obj is Action<any, any> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.hasOwnProperty('type') &&
    obj.hasOwnProperty('value')
  )
}
