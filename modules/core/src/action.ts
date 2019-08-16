import {check} from 'checked-exceptions'
import {curry2} from 'ts-curry'

type AType = string | number

const NoSuchElementException = check('NoSuchElementException', (s: string) => s)

/**
 * Action
 * @class
 */
export abstract class Action<V, T = AType> {
  public abstract readonly type: T
  public abstract readonly value: V
  static of<T extends AType, V>(type: T, value: V): Action<V, T> {
    return Action.isNil(value) ? value : new VAction(type, value)
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

  lift<T2 extends AType>(t: T2) {
    return Action.of(t, this)
  }
}

/**
 * VAction
 * @class
 */
export class VAction<V, T extends AType = AType> extends Action<V, T> {
  constructor(public readonly type: T, public readonly value: V) {
    super()
  }
}

class Nil extends Action<never, never> {
  get type(): never {
    throw new NoSuchElementException('type of nil action')
  }
  get value(): never {
    throw new NoSuchElementException('value of nil action')
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
