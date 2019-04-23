import {curry2} from 'ts-curry'

import {isNil} from './isNil'

/**
 * Interface for Action
 */
export interface Action<T> {
  type: string | number
  value: T
}

function createAction<T>(type: string | number, value: T): Action<T> {
  return isNil(value) ? value : {type, value}
}

/**
 * Creates a new Action type object
 * @param: Action Type
 * @param: Action Payload
 */
export const action: {
  <T>(type: string | number, value: T): Action<T>
  <T>(type: string | number): (value: T) => Action<T>
} = curry2(createAction)
