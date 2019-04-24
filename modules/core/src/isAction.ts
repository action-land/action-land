import {IAction} from './action'

const hasOwnProperty = <K extends string>(
  k: K,
  a: unknown
): a is {[s in K]: unknown} =>
  typeof a === 'object' && a !== null && a.hasOwnProperty(k)

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
