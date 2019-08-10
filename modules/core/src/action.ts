import {curry2} from 'ts-curry'
import {isNil} from './isNil'

type AType = string | number

type func<a, b> = (val: a, state: b) => b

type sAction<V, T extends string | number> = Action<V, T>

type foldSpec<V, S> = V extends sAction<any, infer K>
  ? {
      [k in K]: V extends Action<infer Val, k>
        ? Val extends Action<unknown, string>
          ? (foldSpec<Val, S> | func<Val, S>)
          : (val: Val, state: S) => S
        : never
    }
  : never


export class Action<V, T = AType> {
  private constructor(readonly value: V, readonly type: T) {}
  static of<T extends AType, V>(value: V, type: T) {
    return new Action(value, type)
  }
  fold<S>(spec: foldSpec<this, S>, state: S): S {
    return state
  }
}

function createAction<T extends AType, V>(type: T, value: V) {
  return isNil(value) ? value : Action.of(value, type)
}

// FIXME: Order of type params should be the same as the order of arguments.
/**
 * Creates a new Action type object
 * @function
 * @param {string|number} type
 * @param {any} value
 * @returns {Action}
 */
export const action: {
  <V, T extends AType = AType>(type: T, value: V): Action<V, T>
  <V, T extends AType = AType>(type: T): {(value: V): Action<V, T>}
} = curry2(createAction)
