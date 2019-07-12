import {Action} from './action'

const hasOwnProperty = <K extends string | number>(
  o: unknown,
  k: K
): o is {[k in K]: unknown} => {
  return typeof o === 'object' && o !== null && o.hasOwnProperty(k)
}

/**
 * Checks if the object is of Action type
 * @function
 * @param {any} obj
 * @returns {boolean}
 */
export function isAction(obj: unknown): obj is Action<unknown> {
  return (
    hasOwnProperty(obj, 'type') &&
    hasOwnProperty(obj, 'value') &&
    (typeof obj.type === 'string' || typeof obj.type === 'number')
  )
}
