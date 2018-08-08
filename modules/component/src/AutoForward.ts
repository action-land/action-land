import {COM, Component} from '@action-land/component'
import {action, isAction, Nil} from '@action-land/core'
import {concatC, concatR} from '@action-land/tarz'

type NState<T> = T & {'@@forward': {keys: Array<string>}}
type ComponentSpec = {
  [key: string]: Component
}
type ComponentState<T extends Component> = T extends Component<infer State>
  ? State
  : never
type ChildStateSpec<T extends ComponentSpec> = {
  [k in keyof T]: ComponentState<T[k]>
}

export const AutoForward = <T extends ComponentSpec>(spec: T) => <
  State extends ChildStateSpec<T>,
  Params,
  Init extends any[],
  VNode
>(
  component: Component<State, Params, Init, VNode>
): Component<NState<State>, Params, Init, VNode> =>
  COM(
    (...t: Init) => {
      return Object.assign(
        {'@@forward': {keys: Object.keys(spec)}},
        component.init(...t)
      )
    },
    concatR(
      (action, state: any) =>
        Object.assign({}, state, {
          [action.type]: spec[action.type]
            ? spec[action.type].update(action.value, state[action.type])
            : state[action.type]
        }),
      component.update as any
    ),
    concatC(
      (act, state: any) =>
        isAction(act) && spec[act.type]
          ? action(act.type, spec[act.type].command(act.value, state[act.type]))
          : Nil(),
      component.command as any
    ),
    component.view as any
  )

/**
 * T Y P E S C R I P T
 */

declare function eq<T>(a: T, b: T): void
declare const ChildComponent: Component<
  {count: number},
  {color: string},
  [number, string, Date],
  string
>
declare const ParentComponent: Component<
  {name: string; child: {count: number}},
  {color: string},
  [number, string, Date],
  string
>
declare const expected: Component<
  {name: string; child: {count: number}; '@@forward': {keys: string[]}},
  {color: string},
  [number, string, Date],
  string
>
const actual = AutoForward({child: ChildComponent})(ParentComponent)
eq(actual, expected)
