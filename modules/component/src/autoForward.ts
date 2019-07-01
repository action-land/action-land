import {COM, Component} from '@action-land/component'
import {action, isAction, Nil} from '@action-land/core'
import {concatC, concatR} from '@action-land/tarz'

type anyComponent = Component<any, any, any, any>
type NState<T> = T & {'@@forward': {keys: Array<string>}}
type ComponentSpec = {
  [key: string]: anyComponent
}
type ComponentState<T extends anyComponent> = T extends Component<
  infer S,
  unknown,
  unknown[],
  unknown
>
  ? S
  : unknown
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
