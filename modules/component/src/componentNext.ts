import {Action, action, isAction, List, Nil} from '@action-land/core'
import {LinkedList} from '../internals/linkedList'
import {ComponentProps} from '../types/componentProps'
import {LActionTypes} from '../types/extractActionType'
import {LObjectValues} from '../types/extractValueType'
import {LActionValueForType} from '../types/extractValueTypeFromAction'
import {LActionValueForTypeWithDefault} from '../types/extractValueTypeFromActionWithDefault'
import {mergeProps} from '../types/mergeProps'
import {iChildren} from '../types/pickChildrenType'
import {iActions} from '../types/pickIActionsType'
import {iState} from '../types/pickIStateType'
import {oActions} from '../types/pickOActionType'
import {oState} from '../types/pickOStateType'
import {oView} from '../types/pickOutputViewType'
import {iProps} from '../types/pickPropType'
import {Component} from './component'
import {ListComponentState} from './listComponentState'

/**
 * Creates a new component-type with the overridden props
 */
export type iComponentNext<P, S> = ComponentNext<mergeProps<P, S>>

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

/**
 * API for type safe and composable components that are agnostic of view library
 */
export class ComponentNext<P1 extends ComponentProps> {
  /**
   * @param _init Function which returns initial state of the component
   * @param _update Function which takes action and state, and returns new state
   * @param _command Function which takes action and state, and returns new action
   * @param _view Function which returns view based on state and props
   */
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

  /**
   * Transform ComponentNext P1 to ComponentNext P2
   * @param fn mapper function to transform component
   */
  lift<P2>(fn: (c: ComponentNext<P1>) => ComponentNext<P2>): ComponentNext<P2> {
    return fn(this)
  }

  /**
   * Create new component with provided value as initial state
   *
   * ```typescript
   * import {ComponentNext} from '@action-land/component'
   *
   * const component = ComponentNext.lift({count: 100})
   * ```
   * @param state initial state of component
   */
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

  /**
   * Create new component with state as undefined
   *
   * ```typescript
   * import {ComponentNext} from '@action-land/component'
   *
   * const component = ComponentNext.empty
   * ```
   */
  static get empty(): ComponentNext<{
    iState: undefined
    oView: void
  }> {
    return ComponentNext.lift(undefined)
  }

  /**
   * Add transformation of component's state for a given action
   * p.s: Check out test cases for advanced use cases
   *
   * ```typescript
   * import {ComponentNext} from '@action-land/component'
   *
   * const component = ComponentNext.lift({count: 100})
   *  .matchR('add', (value: number, state) => ({count: state.count + value}))
   *  // Adds behaviour to handle action of type Action<number, 'add'>
   * ```
   * @typeparam T Action type to be handled by component
   * @typeparam V Value of action to be handled by component
   * @typeparam oState2 New state returned by the cb function
   * @param type Action type for which we want to add behaviour
   * @param cb Transformation function that returns a new state
   */
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

  /**
   * Add ability to return new action on matching action
   *
   *```typescript
   * import {ComponentNext} from '@action-land/component'
   * import {Action} from '@action-land/core'
   *
   * const component = ComponentNext.lift({count: 100})
   *  .matchC('persist', (value: number, state) => (Action.of('writeCache', value)))
   *  // Adds behaviour to handle action of type Action<number, 'persist'>
   * ```
   * @typeparam T Action type to be handled by component
   * @typeparam V Type of action value to be handled by component
   * @typeparam T2 Action type fired by cb function
   * @typeparam V2 value of action fired by cb function
   * @param type Action type for which we want to add behaviour
   * @param cb Function that returns new action
   */
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

  /**
   * Add component as a child of a given component i.e
   * 1. Forward all actions with type of child's name to child component update function
   * 2. maintain self-state and child's state separately
   *
   * ```typescript
   * import {ComponentNext} from '@action-land/component'
   *
   * const child1 = ComponentNext.lift({c1: 100})
   * const child2 = ComponentNext.lift({c2: 200})
   * const component = ComponentNext.lift({c: 1000})
   *  .install(
   *  {
   *    child1, // actions of type `child1` will be forwarded to child1 component
   *    child2  // actions of type `child2` will be forwarded to child2 component
   *  }
   * )
   *
   * component._init()
   * //outputs
   * //{
   * // node: {c: 1000},
   * // children: {
   * //   child1: {c1: 100},
   * //   child2: {c2: 200}
   * // }
   * //}
   *
   * ```
   * @param spec key value pair object of child name and child component
   *
   */
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
  /**
   * Adds presentation logic to the component
   * 1. Create view based on props and state
   *
   * ```typescript
   * import {ComponentNext} from '@action-land/component'
   *
   * const component1 = ComponentNext.lift(10)
   *   .render((_, props: string) => [props, _.state + 1])
   *
   * component._view({}, component._init(), 'Hello') // output: [Hello, 11]
   * ```
   * 2. Can invoke child component's view
   *
   * ```typescript
   * import {ComponentNext} from '@action-land/component'
   *
   * const component = ComponentNext.lift('Hello')
   *   .install({
   *     child: ComponentNext.lift('World').render((_, p: string) => p)
   *   })
   *   .render((_, p: string) => [p, _.children.child('World')]
   *
   * component._view({}, component._init(), 'Hello') // output: [Hello, World]
   * ```
   * 3. Can emit action
   *
   * ```typescript
   * import {ComponentNext} from '@action-land/component'
   *
   * const component = ComponentNext.lift(10)
   *   .matchR('add', (a: number, s) => s + a)
   *   .render(_ => _.actions.add(100))
   *
   * component._view({}, component._init()) // output: Action<100, 'add'> and changes component state to 110
   * ```
   * @typeparam P View prop type
   * @typeparam V View representation data structure type
   * @param cb Function which return view based on props and state
   */
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

  /**
   * Transform initial state of the component
   *
   * ```typescript
   *
   * import {ComponentNext} from '@action-land/component'
   *
   * ComponentNext.lift({count: 100}).configure(iState => ({
   *  count: iState.count * 2
   * }))
   *
   * const component._init() // output: {count: 200}
   * ```
   * @typeparam S2 State type post transformation
   * @param fn function to transform the state
   *
   */
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

  /**
   * Memoize component view based on comparator passed
   * @param fn Comparator function which decides whether to return cached view or calculate new view
   */
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
  toList<T extends string | number>(
    fn: (p: iProps<P1>) => T
  ): iComponentNext<
    P1,
    {
      iState: ListComponentState<iState<P1>>
      oState: ListComponentState<oState<P1>>
      iActions: Action<iActions<P1>, T>
      oActions: Action<oActions<P1>, T>
    }
  > {
    return new ComponentNext(
      () => ListComponentState.of(this._init as () => iState<P1>),
      (inputAction: any, state: any) => {
        const lisComponentState = state as ListComponentState<iState<P1>>
        const itemState = lisComponentState.get(inputAction.type)
        const updatedState = itemState.fold(
          this._update(inputAction.value, this._init()),
          some => this._update(inputAction.value, some)
        )
        return lisComponentState.set(inputAction.type, updatedState)
      },
      (inputAction: any, state: any) => {
        return action(
          inputAction.type,
          this._command(
            inputAction.value,
            state
              .get(inputAction.type)
              .fold(this._init(), (some: iState<P1>) => some)
          )
        )
      },
      (e: any, s: any, p: any) => {
        const key = fn(p)
        return this._view(
          e.of(key),
          s.get(key).fold(this._init(), (some: iState<P1>) => some),
          p
        )
      },
      /**
       * @todo: Need to re-look this
       */
      {},
      /**
       * @todo: Need to re-look this
       */
      LinkedList.empty,
      this._comparator
    )
  }

  /**
   * Method to convert old component API to ComponentNext
   * @typeparam A state
   * @typeparam V view
   * @typeparam P prop
   * @typeparam I init param
   */
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
  /**
   * Method to convert componentNext to old component API
   */
  get component(): Component<oState<P1>, iProps<P1>, [], oView<P1>> {
    return {
      init: this._init,
      update: this._update,
      command: this._command,
      view: this._view
    } as any
  }
}
