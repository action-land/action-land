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

function createAction(type: string | number, value: INilAction): INilAction
function createAction<T>(type: string | number, value: T): IAction<T>
function createAction(type: string | number, value: unknown): IAction<unknown> {
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
