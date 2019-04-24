import {curry2} from 'ts-curry'

import {isNil} from './isNil'
import {INilAction} from './nil'

/**
 * Interface for Action
 */
export interface IAction<T> {
  type: string | number
  value: T
}

// TODO(tsc): Cleanup output typings once Action.type is also typed
function createAction<T>(
  type: string | number,
  value: T
): INilAction | IAction<T> {
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
