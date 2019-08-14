import {curry2} from 'ts-curry'

type AType = string | number
const NIL_TYPE = '@@NIL'

/**
 * Action
 * @class
 */
export class Action<V, T = AType> {
  constructor(public readonly type: T, public readonly value: V) {}
  static of<T extends AType, V>(type: T, value: V) {
    return Action.isNil(value) ? value : new Action(type, value)
  }

  static isAction(a: unknown): a is Action<unknown> {
    return a instanceof Action
  }

  static isNil(a: unknown): a is Nil {
    return a instanceof Nil
  }

  static nil(): Nil {
    return new Nil()
  }
}

class Nil extends Action<undefined, typeof NIL_TYPE> {
  constructor() {
    super(NIL_TYPE, undefined)
  }
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
} = curry2(Action.of)
