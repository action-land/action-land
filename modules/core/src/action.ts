import {curry2} from 'ts-curry'
import {isNil} from './isNil'

type AType = string | number

/**
 * Interface for Action
 * @interface
 */
export interface Action<V, T = AType> {
  readonly type: T
  readonly value: V
}

function createAction<T extends AType, V>(type: T, value: V) {
  return isNil(value) ? value : {type, value}
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

type func<a,b> = (val: a, state: b) => b
type foldSpec<V, S> = V extends Action2<any, infer K>
  ? {
      [k in K]: V extends Action2<infer Val, k>
        ? Val extends Action2<unknown, string>
          ? (foldSpec<Val, S> | func<Val, S>)
          : (val: Val, state: S) => S
        : never
    }
  : never

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
export function isAction(obj: unknown): obj is Action2<unknown> {
  return (
    hasOwnProperty(obj, 'type') &&
    hasOwnProperty(obj, 'value') &&
    (typeof obj.type === 'string' || typeof obj.type === 'number')
  )
}

export class Action2<V, T extends string = string> {
  private constructor(readonly value: V, readonly type: T) {}
  static of<T extends string, V>(value: V, type: T) {
    return new Action2(value, type)
  }
  fold<S>(spec: foldSpec<V, S>, state: S): S {
    let newState = state
    if (
      isAction(this.value) &&
      spec[this.value.type] &&
      typeof spec[this.value.type] === 'function'
    ) {
      newState = spec[this.value.type](this.value.value, state)
    }
    if (
      isAction(this.value) &&
      spec[this.value.type] &&
      typeof spec[this.value.type] === 'object' &&
      spec[this.value.type] !== null
    ) {
      newState = this.fold.bind(this.value)(
        spec[this.value.type] as foldSpec<unknown, S>,
        newState
      )
    }
    return newState
  }
}
