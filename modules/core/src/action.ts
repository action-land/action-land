import {curry2} from 'ts-curry'
import {isNil} from './isNil'

/**
 * Interface for Action
 * @interface
 */
export interface Action<Type, Value> {
  type: Type
  value: Value
}

function createAction<Type, Value>(type: Type, value: Value) {
  return isNil(value) ? value : {type, value}
}

/**
 * Creates a new Action type object
 * @function
 * @param {type} Action's Type
 * @param {value} Action's Payload
 * @returns {Action}
 */
export const action: {
  <Type, Value>(type: Type, value: Value): Action<Type, Value>
  <Type, Value>(type: Type): {(value: Value): Action<Type, Value>}
} = curry2(createAction)
