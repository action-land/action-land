import {Action} from './action'

/**
 * Checks if the object is of Action type
 * @function
 * @param {any} obj
 * @returns {boolean}
 */
export function isAction(obj: unknown): obj is Action<unknown> {
  return obj instanceof Action
}
