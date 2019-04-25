import {curry2} from 'ts-curry'

import {isNil} from './isNil'
import {INilAction} from './nil'

export type IActionType = string | number
/**
 * Interface for Action
 */
export interface IAction<Type extends IActionType, Payload> {
  type: Type
  value: Payload
}

function createAction<K, T extends INilAction>(type: K, value: T): INilAction
function createAction<K extends IActionType, T>(
  type: K,
  value: T
): IAction<K, T>
function createAction<K extends IActionType, T>(
  type: K,
  value: T
): IAction<K, T> | INilAction {
  return isNil(value) ? value : {type, value}
}

/**
 * Creates a new IAction object.
 * If payload is a Nil() Action, it's returned as-is.
 * @param: Action Type
 * @param: Action Payload
 */
export const action: {
  <K extends IActionType, T>(type: K, value: T): IAction<K, T>
  <K extends IActionType, T>(type: K): (value: T) => IAction<K, T>
} = curry2(createAction)
