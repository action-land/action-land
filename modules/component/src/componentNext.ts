import {Action, isAction, List, Nil} from '@action-land/core'

export type ComponentProps = {
  readonly iState?: unknown
  readonly oState?: unknown
  readonly iActions?: Action<unknown>
  readonly oActions?: Action<unknown>
}

/**
 * Extracts values of the provided keys from ComponentProps
 */
type PP<
  O extends ComponentProps,
  K extends keyof ComponentProps
> = K extends keyof O ? O[K] : never

/**
 * Extracts values of the provided keys from ComponentNext
 */
type PPP<
  O extends ComponentNext<ComponentProps>,
  K extends keyof ComponentProps
> = O extends ComponentNext<infer P> ? PP<P, K> : never

type iState<P> = PP<P, 'iState'>
type oState<P> = PP<P, 'oState'>
type iActions<P> = PP<P, 'iActions'>
type oActions<P> = PP<P, 'oActions'>

//#region TypeLambdas
type LActionTypes<A> = A extends Action<any, infer T> ? T : never
type LActionValues<A> = A extends Action<infer V, any> ? V : never
type LObjectValues<O> = O extends {[k: string]: infer S} ? S : unknown
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
const arg2 = <A, B>(a: A, b: B) => b
export class ComponentNext<P1 extends ComponentProps> {
  private constructor(
    // TODO: Fix typings for _init, _update, _command
    readonly _init: (...t: unknown[]) => unknown,
    readonly _update: (a: Action<unknown>, b: unknown) => unknown,
    readonly _command: (a: Action<unknown>, b: unknown) => unknown
  ) {}

  lift<P2>(fn: (c: ComponentNext<P1>) => ComponentNext<P2>): ComponentNext<P2> {
    return fn(this)
  }

  static lift<S>(state: S): ComponentNext<{iState: S; oState: S}> {
    const i = () => state
    return new ComponentNext(i, arg2, Nil)
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
        if (a.type === type) {
          return {...s, ...cb(a.value as V, s2 as iState<P1>)}
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

  forward<
    S extends {
      [k: string]: ComponentNext<any>
    }
  >(
    spec: S
  ): iComponentNext<
    P1,
    {
      iState: {
        node: iState<P1>
        children: {[k in keyof typeof spec]: PPP<typeof spec[k], 'iState'>}
      }
      oState: {
        node: iState<P1>
        children: {[k in keyof typeof spec]: PPP<typeof spec[k], 'oState'>}
      }
      iActions:
        | iActions<P1>
        | LObjectValues<
            {
              [k in keyof S]: S[k] extends ComponentNext<infer P2>
                ? Action<iActions<P2>, k>
                : never
            }
          >
      oActions:
        | oActions<P1>
        | LObjectValues<
            {
              [k in keyof S]: S[k] extends ComponentNext<infer P2>
                ? Action<oActions<P2>, k>
                : never
            }
          >
    }
  > {
    return new ComponentNext(
      () => {
        const node = this._init()
        const children: any = {}
        for (let i in spec) {
          if (spec.hasOwnProperty(i)) {
            children[i] = spec[i]._init()
          }
        }
        return {node, children}
      },
      (a: any, s: any) => {
        const node = this._update(a, s.node)

        const children: any = {...s.children}
        for (let key in spec) {
          const c = spec[key]
          if (spec.hasOwnProperty(key)) {
            if (a.type === key) {
              const data = c._update(a.value, s.children[key])
              children[key] = data
            }
          }
        }
        return {node, children}
      },
      this._command
    )
  }
}
