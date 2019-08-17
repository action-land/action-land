import {check} from 'checked-exceptions'
import {curry2} from 'ts-curry'

type AType = string | number

const NoSuchElementException = check('NoSuchElementException', (s: string) => s)

type FoldSpec<V, T, S> =
  | ((seed: S, value: Action<V, T>) => S)
  | (V extends Action<infer VV, infer TT>
      ? TT extends AType
        ? {[k in TT]: FoldSpec<VV, TT, S>}
        : (seed: S, value: Action<VV, TT>) => S
      : never)

const hasOwnProperty = <P extends string | number>(
  obj: unknown,
  prop: P
): obj is {[k in P]: unknown} => {
  return typeof obj === 'object' && obj !== null && obj.hasOwnProperty(prop)
}

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

  fold<S>(seed: S, spec: FoldSpec<V, T, S>): S {
    if (typeof spec === 'function') {
      return spec(seed, this)
    }

    if (typeof spec === 'object') {
      let s: unknown = spec
      let a: unknown = this.value

      while (Action.isAction(a) && hasOwnProperty(s, a.type)) {
        s = s[a.type]
        if (typeof s === 'function') return s(seed, a)
        a = a.value
      }
    }
    return seed
  }

  lift<T2 extends AType>(t: T2): Action<Action<V, T>, T2> {
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
