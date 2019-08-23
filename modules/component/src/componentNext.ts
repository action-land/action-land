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
type LObjectValues<O> = O extends {[k: string]: infer S} ? S : unknown
type LActionValueForType<A, T> = A extends Action<infer V, T> ? V : never
type LActionValueForTypeWithDefault<A, T, D> = LActionValueForType<
  A,
  T
> extends never
  ? D
  : LActionValueForType<A, T>
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

/**
 * Comparator function used for memoization
 */
type Comparator = <S, P>(s1: S, p1: P, s2?: S, p2?: P) => boolean

const defaultComparator: Comparator = () => true

const arg2 = <A, B>(a: A, b: B) => b
export class ComponentNext<P1 extends ComponentProps> {
  private constructor(
    // FIXME: Fix typings for _init, _update, _command
    readonly _init: () => any,
    readonly _update: (a: Action<unknown>, b: unknown) => any,
    readonly _command: (a: Action<unknown>, b: unknown) => unknown,
    readonly _view: (e: unknown, s: unknown, p: unknown) => unknown,
    private readonly _children: {[k: string]: ComponentNext<any>},
    private readonly _iActions: LinkedList<string | number>,
    private readonly _comparator: Comparator
  ) {}

  lift<P2>(fn: (c: ComponentNext<P1>) => ComponentNext<P2>): ComponentNext<P2> {
    return fn(this)
  }

  static lift<S>(state: S): ComponentNext<{iState: S; oView: void}> {
    const i = () => state
    return new ComponentNext(
      i,
      arg2,
      Nil,
      () => undefined,
      {},
      LinkedList.empty,
      defaultComparator
    )
  }

  static get empty(): ComponentNext<{
    iState: undefined
    oView: void
  }> {
    return ComponentNext.lift(undefined)
  }

  matchR<T extends string | number, V, oState2 extends iState<P1>>(
    type: T,
    cb: (
      value: LActionValueForTypeWithDefault<iActions<P1>, T, V>,
      state: iState<P1>
    ) => oState2
  ): iComponentNext<
    P1,
    {
      iActions:
        | Action<LActionValueForTypeWithDefault<iActions<P1>, T, V>, T>
        | iActions<P1>
      oState: oState2 | oState<P1>
    }
  > {
    return new ComponentNext(
      this._init,
      (a, s: any) => {
        const s2 = this._update(a, s) as any
        if (a.type === type) {
          // this.update args type is Action<unknown>
          return cb(a.value as any, s2)
        }
        return s2
      },
      this._command,
      this._view,
      this._children,
      this._iActions.prepend(type),
      this._comparator
    )
  }

  matchC<T extends string | number, V, V2, T2 extends string | number>(
    type: T,
    cb: (
      value: LActionValueForTypeWithDefault<iActions<P1>, T, V>,
      state: iState<P1>
    ) => Action<V2, T2>
  ): iComponentNext<
    P1,
    {
      iActions:
        | Action<LActionValueForTypeWithDefault<iActions<P1>, T, V>, T>
        | iActions<P1>
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
      this._iActions.prepend(type),
      this._comparator
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
      Object.keys(spec).reduce((a, b) => a.prepend(b), this._iActions),
      this._comparator
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
        state: oState<P1> | iState<P1>
        children: {
          [k in keyof iChildren<P1>]: iProps<iChildren<P1>[k]> extends never
            ? () => oView<iChildren<P1>[k]>
            : (p: iProps<iChildren<P1>[k]>) => oView<iChildren<P1>[k]>
        }
      },
      p: P
    ) => V
  ): iComponentNext<P1, {oView: V; iProps: P}> {
    let cachedProps: iProps<P1>
    let cachedState: oState<P1>
    let cachedView: V

    return new ComponentNext(
      this._init,
      this._update,
      this._command,
      function(this: ComponentNext<P1>, e: any, s: any, p: any) {
        if (
          cachedView !== undefined &&
          this._comparator !== defaultComparator &&
          this._comparator(s, p, cachedState, cachedProps)
        ) {
          return cachedView
        }
        cachedProps = p
        cachedState = s

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

        return (cachedView = cb(
          {
            actions: actions as any,
            state: s,
            children
          },
          p as any
        ))
      },
      this._children,
      this._iActions,
      this._comparator
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
      this._iActions,
      defaultComparator
    )
  }

  memoizeWith(
    fn: (
      s1: oState<P1> | iState<P1>,
      p1: iProps<P1>,
      s2?: oState<P1> | iState<P1>,
      p2?: iProps<P1>
    ) => boolean
  ): ComponentNext<P1> {
    return new ComponentNext(
      this._init,
      this._update,
      this._command,
      this._view,
      this._children,
      this._iActions,
      (...t) => {
        const args = t as [
          oState<P1> | iState<P1>,
          iProps<P1>,
          oState<P1> | iState<P1>,
          iProps<P1>
        ]
        return this._comparator === defaultComparator
          ? fn(...args)
          : this._comparator(...args) && fn(...args)
      }
    )
  }

  static from<A, V, P, I extends unknown[]>(
    component: {
      init: (...t: I) => A
      update: (a: any, s: any) => any
      command: (a: any, s: any) => any
      view: (e: any, s: any, p: P) => V
    },
    ...initParams: I
  ): ComponentNext<{iState: A; oState: A; oView: V; iProps: P}> {
    return new ComponentNext(
      () => component.init(...initParams),
      component.update,
      component.command,
      component.view as any,
      {},
      LinkedList.empty,
      defaultComparator
    )
  }

  get component(): Component<iState<P1>, iProps<P1>, [], oView<P1>> {
    return {
      init: this._init,
      update: this._update,
      command: this._command,
      view: this._view
    } as any
  }
}
