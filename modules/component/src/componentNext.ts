import {Action, isAction, List, Nil} from '@action-land/core'

/**
 * Removes duplicate A | A insertions.
 */
type U<A, B> = A | B extends A & B ? A : A | B
export class ComponentNext<
  iState1 = unknown,
  oState1 = unknown,
  iActions1 = never,
  oActions1 = never
> {
  private constructor(
    readonly _init: (...t: unknown[]) => unknown,
    readonly _update: (a: Action<unknown>, b: unknown) => unknown = (
      a: unknown,
      s: unknown
    ) => s,
    readonly _command: (a: Action<unknown>, b: unknown) => unknown = Nil
  ) {}

  lift<C extends ComponentNext>(
    fn: (c: ComponentNext<iState1, oState1, iActions1, oActions1>) => C
  ): C {
    return fn(this)
  }

  static lift<S>(state: S): ComponentNext<S, S, never, never> {
    return new ComponentNext(() => state)
  }

  matchR<T extends string | number, V, oState2 extends oState1>(
    type: T,
    cb: (value: V, state: iState1) => oState2
  ): ComponentNext<
    iState1,
    // oState1 | oState2 extends oState2 ? oState2 : oState1 | oState2,
    U<oState1, oState2>,
    iActions1 | Action<V, T>,
    oActions1
  > {
    return new ComponentNext(
      this._init,
      (a, s) => {
        const s2 = this._update(a, s)
        if (isAction(a) && a.type === type) {
          return cb(a.value, s2 as iState1)
        }
        return s2
      },
      this._command
    )
  }

  matchC<T extends string | number, V, V2, T2 extends string | number>(
    type: T,
    cb: (value: V, state: iState1) => Action<V2, T2>
  ): ComponentNext<iState1, oState1, iActions1, oActions1 | Action<V2, T2>> {
    return new ComponentNext(this._init, this._update, (a, s) => {
      const a2 = this._command(a, s) as Action<unknown>
      if (isAction(a) && a.type === type) {
        return List(a2, cb(a.value, s as iState1))
      }
      return a2
    })
  }
}
