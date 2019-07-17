import {Action, action, isAction, List, Nil} from '@action-land/core'
import {LinkedList} from '../internals/linkedList'
import {Component} from './component'

export type ComponentProps = {
  readonly iState?: unknown
  readonly oState?: unknown
  readonly iActions?: Action<unknown>
  readonly oActions?: Action<unknown>
  readonly oView?: unknown
  readonly iChildren?: unknown
  readonly iProps?: unknown
}

//#region TypeLambdas
/**
 * Extracts values of the provided keys
 */
type PP<O, K> = K extends keyof O ? O[K] : never

/**
 * Extracts values of the provided keys from ComponentNext or ComponentProps
 */
type PPP<O, K extends keyof ComponentProps> = O extends ComponentNext<infer P>
  ? PP<P, K>
  : O extends ComponentProps
  ? PP<O, K>
  : never

type iState<P> = PPP<P, 'iState'>
type oState<P> = PPP<P, 'oState'>
type iActions<P> = PPP<P, 'iActions'>
type oActions<P> = PPP<P, 'oActions'>
type oView<P> = PPP<P, 'oView'>
type iChildren<P> = PPP<P, 'iChildren'>
type iProps<P> = PPP<P, 'iProps'>

type LActionTypes<A> = A extends Action<any, infer T> ? T : never
type LActionValues<A> = A extends Action<infer V, any> ? V : never
type LObjectValues<O> = O extends {[k: string]: infer S} ? S : unknown
type LActionValueForType<A, T> = A extends Action<infer V, T> ? V : never
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
    // FIXME: Fix typings for _init, _update, _command
    readonly _init: () => any,
    readonly _update: (a: Action<unknown>, b: unknown) => any,
    readonly _command: (a: Action<unknown>, b: unknown) => unknown,
    readonly _view: (e: unknown, s: unknown, p: unknown) => unknown,
    private readonly _children: {[k: string]: ComponentNext<any>},
    private readonly _iActions: LinkedList<string | number>
  ) {}

  lift<P2>(fn: (c: ComponentNext<P1>) => ComponentNext<P2>): ComponentNext<P2> {
    return fn(this)
  }

  static lift<S>(state: S): ComponentNext<{iState: S; oState: S; oView: void}> {
    const i = () => state
    return new ComponentNext(
      i,
      arg2,
      Nil,
      () => undefined,
      {},
      LinkedList.empty
    )
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
      (a, s: any) => {
        const s2 = this._update(a, s) as any
        if (a.type === type) {
          return cb(a.value as V, s2)
        }
        return s2
      },
      this._command,
      this._view,
      this._children,
      this._iActions.prepend(type)
    )
  }

  matchC<T extends string | number, V, V2, T2 extends string | number>(
    type: T,
    cb: (value: V, state: iState<P1>) => Action<V2, T2>
  ): iComponentNext<
    P1,
    {
      iActions: T extends LActionTypes<iActions<P1>>
        ? Action<V & LActionValues<iActions<P1>>, T>
        : Action<V, T> | iActions<P1>
      oActions: oActions<P1> | Action<V2, T2>
    }
  > {
    return new ComponentNext(
      this._init,
      this._update,
      (a, s) => {
        const a2 = this._command(a, s) as Action<unknown>
        if (isAction(a) && a.type === type) {
          return List(a2, cb(a.value as any, s as iState<P1>))
        }
        return a2
      },
      this._view,
      this._children,
      this._iActions.prepend(type)
    )
  }

  install<
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
        children: {[k in keyof typeof spec]: iState<typeof spec[k]>}
      }
      oState: {
        node: oState<P1>
        children: {[k in keyof typeof spec]: oState<typeof spec[k]>}
      }
      iChildren: S
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

        return {node, children: children}
      },
      (a: any, s: any) => {
        const node = this._update(a, s.node)
        const children: any = s.children
        if (spec[a.type]) {
          return {
            node,
            children: {
              ...s.children,
              [a.type]: spec[a.type]._update(a.value, s.children[a.type])
            }
          }
        }
        return {node, children}
      },
      (a: any, s: any) => {
        const a1 = this._command(a, s) as Action<unknown>

        if (spec[a.type]) {
          return List(
            a1,
            action(a.type, spec[a.type]._command(a.value, s.children[a.type]))
          )
        }
        return a1
      },
      this._view,
      spec,
      Object.keys(spec).reduce((a, b) => a.prepend(b), this._iActions)
    )
  }

  render<P = never, V = unknown>(
    cb: (
      env: {
        actions: {
          [k in LActionTypes<iActions<P1>>]: (
            e: LActionValueForType<iActions<P1>, k>
          ) => unknown
        }
        state: oState<P1>
        children: {
          [k in keyof iChildren<P1>]: iProps<iChildren<P1>[k]> extends never
            ? () => oView<iChildren<P1>[k]>
            : (p: iProps<iChildren<P1>[k]>) => oView<iChildren<P1>[k]>
        }
      },
      p: P
    ) => V
  ): iComponentNext<P1, {oView: V; iProps: P}> {
    return new ComponentNext(
      this._init,
      this._update,
      this._command,
      (e: any, s: any, p) => {
        const children: any = {}
        for (let i in this._children) {
          if (this._children.hasOwnProperty(i)) {
            const item = this._children[i]
            children[i] = (p: unknown) => item._view(e.of(i), s.children[i], p)
          }
        }

        const actions = this._iActions.reduce({}, (key, actions) => ({
          ...actions,
          [key]: (ev: any) => e.of(key).emit(ev)
        }))
        return cb(
          {
            actions: actions as any,
            state: s,
            children
          },
          p as any
        )
      },
      this._children,
      this._iActions
    )
  }

  configure<S2 extends iState<P1>>(
    fn: (a: iState<P1>) => S2
  ): iComponentNext<P1, {iState: S2}> {
    return new ComponentNext(
      () => fn(this._init()),
      this._update,
      this._command,
      this._view,
      this._children,
      this._iActions
    )
  }

  static from<A, V, P>(
    init: (...t: any[]) => A,
    update: (a: any, s: any) => any,
    command: (a: any, s: any) => any,
    view: (e: any, s: any, p: P) => V
  ): ComponentNext<{iState: A; oState: A; oView: V; iProps: P}> {
    return new ComponentNext(
      init,
      update,
      command,
      view as any,
      {},
      LinkedList.empty
    )
  }

  get component(): Component<oState<P1>, iProps<P1>, [], oView<P1>> {
    return {
      init: this._init,
      update: this._update,
      command: this._command,
      view: this._view
    } as any
  }
}
