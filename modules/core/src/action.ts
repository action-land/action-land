import {curry2} from 'ts-curry'

import {isNil} from './isNil'

/**
 * Interface for Action
 */
export interface IAction<T> {
  type: string | number
  value: T
}

// TODO(tsc): Add overloads to show that NilAction input produces a NilAction
function createAction<T>(type: string | number, value: T): IAction<any> {
  return isNil(value) ? value : {type, value}
}

/**
 * Creates a new Action type object
 * @param: Action Type
 * @param: Action Payload
 */
export const action: {
  <T>(type: string | number, value: T): IAction<T>
  <T>(type: string | number): (value: T) => IAction<T>
} = curry2(createAction)
