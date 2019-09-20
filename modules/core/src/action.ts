import {check} from 'checked-exceptions'
import {curry2} from 'ts-curry'

export type AType = string | number

const NoSuchElementException = check('NoSuchElementException', (s: string) => s)

type FoldSpec<A, S> =
  | ((value: A, seed: S) => S)
  | (A extends Action<infer V, infer T>
      ? T extends string | number | symbol
        ? {[k in T]: FoldSpec<V, S>}
        : ((value: A, seed: S) => S)
      : never)

const hasOwnProperty = <P extends string | number>(
  obj: unknown,
  prop: P
): obj is {[k in P]: unknown} => {
  return typeof obj === 'object' && obj !== null && obj.hasOwnProperty(prop)
}

/**
 * Data format to send messages among components
 * @class
 */
export abstract class Action<V, T = AType> {
  public abstract readonly type: T
  public abstract readonly value: V
  /**
   * Create new Action
   * @param type Address of the message
   * @param value Content of the message
   */
  static of<T extends AType, V>(type: T, value: V): Action<V, T> {
    return Action.isNil(value) ? value : new VAction(type, value)
  }
  /**
   * Return true if parameter passed is an action
   * @param a
   */
  static isAction(a: unknown): a is Action<unknown> {
    return a instanceof Action
  }

  /**
   * Return true if parameter passed is a Nil action
   * @param a
   */
  static isNil(a: unknown): a is Nil {
    return a instanceof Nil
  }
  /**
   * Creates new nil action
   */
  static nil(): Nil {
    return new Nil()
  }
  /**
   * Declarative API to reduce nested action
   * @param action Action
   * @param seed Initial value which needs to be updated on action
   * @param spec key-value Object which has either object or function as value
   * ```typescript
   *import {Action} from '@action-land/core'
   *const testAction = Action.of('a', {count: 10}).lift('b').lift('c')
   *const newState = Action.fold(testAction, {count: 100}, {
   *  c: {
   *    b: {
   *      a: (a, s) => ({count: a.count + s.count})
   *    }
   *  }
   *}) // returns {count: 110}
   * ```
   */
  static fold<S, A extends Action<unknown, unknown>>(
    action: A,
    seed: S,
    spec: FoldSpec<A, S>
  ): S {
    if (typeof spec === 'function') {
      return spec(action, seed)
    }

    if (typeof spec === 'object') {
      let s: unknown = spec
      let a: unknown = action

      while (Action.isAction(a) && hasOwnProperty(s, a.type)) {
        s = s[a.type]
        a = a.value
        if (typeof s === 'function') return s(a, seed)
      }
    }
    return seed
  }
  /**
   * wrap current action into another action with provided type
   * @param t Type to list action with
   * ```typescript
   * import {Action} from '@action-land/core'
   * const testAction = Action.of('a', {count: 10}) // Action<{count: number}, 'a'>
   * const testActionLifted = testAction.lift('b') // Action<Action<{count: number}, 'a'>, 'b'>
   * ```
   */
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
/**
 * A default action that represents nothingness.
 */
export class Nil extends Action<never, never> {
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
 * @deprecated use Action.of() instead
 * @function
 * @param {string|number} type
 * @param {any} value
 * @returns {Action}
 */
export const action: {
  <V, T extends AType = AType>(type: T, value: V): Action<V, T>
  <V, T extends AType = AType>(type: T): {(value: V): Action<V, T>}
} = curry2(Action.of)
