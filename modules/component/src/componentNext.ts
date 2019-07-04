import {Action, isAction, List, Nil} from '@action-land/core'

export type ComponentProps = {
  readonly iState?: unknown
  readonly oState?: unknown
  readonly iActions?: Action<unknown>
  readonly oActions?: Action<unknown>
}

type PP<
  O extends ComponentProps,
  K extends keyof ComponentProps
> = K extends keyof O ? O[K] : never

type iState<P> = PP<P, 'iState'>
type oState<P> = PP<P, 'oState'>
type iActions<P> = PP<P, 'iActions'>
type oActions<P> = PP<P, 'oActions'>

//#region TypeLambdas
type LActionTypes<A> = A extends Action<any, infer T> ? T : never
type LActionValues<A> = A extends Action<infer V, any> ? V : never
//#endregion

/**
 * Overwrite the props in T with props in S.
 */
export type iSet<T, S> = Omit<T, keyof S> & S

/**
 * Creates a new component-type with the overridden props
 */
export type iComponentNext<P, S> = ComponentNext<iSet<P, S>>

/**
 * Removes duplicate A | A insertions.
 */
export type U<A, B> = A | B extends A & B ? A : A | B

export class ComponentNext<P1 extends ComponentProps> {
  private constructor(
    readonly _init: (...t: unknown[]) => unknown,
    readonly _update: (a: Action<unknown>, b: unknown) => unknown = (
      a: unknown,
      s: unknown
    ) => s,
    readonly _command: (a: Action<unknown>, b: unknown) => unknown = Nil
  ) {}

  lift<P2>(fn: (c: ComponentNext<P1>) => ComponentNext<P2>): ComponentNext<P2> {
    return fn(this)
  }

  static lift<S>(state: S): ComponentNext<{iState: S; oState: S}> {
    return new ComponentNext(() => state)
  }

  matchR<T extends string | number, V, oState2 extends oState<P1>>(
    type: T,
    cb: (value: V, state: iState<P1>) => oState2
  ): iComponentNext<
    P1,
    {
      iActions: T extends LActionTypes<iActions<P1>>
        ? Action<V & LActionValues<iActions<P1>>, T>
        : Action<V, T> | iActions<P1>
      oState: oState2 | iState<P1>
    }
  > {
    return new ComponentNext(
      this._init,
      (a, s) => {
        const s2 = this._update(a, s)
        if (isAction(a) && a.type === type) {
          return cb(a.value, s2 as iState<P1>)
        }
        return s2
      },
      this._command
    )
  }

  matchC<T extends string | number, V, V2, T2 extends string | number>(
    type: T,
    cb: (value: V, state: iState<P1>) => Action<V2, T2>
  ): iComponentNext<P1, {oActions: oActions<P1> | Action<V2, T2>}> {
    return new ComponentNext(this._init, this._update, (a, s) => {
      const a2 = this._command(a, s) as Action<unknown>
      if (isAction(a) && a.type === type) {
        return List(a2, cb(a.value, s as iState<P1>))
      }
      return a2
    })
  }
}
