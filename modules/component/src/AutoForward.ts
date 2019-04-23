import {COM, Component} from '@action-land/component'
import {action, isAction, Nil} from '@action-land/core'
import {concatC, concatR} from '@action-land/tarz'

type NState<T> = T & {'@@forward': {keys: string[]}}
interface ComponentSpec {
  [key: string]: Component
}
type ComponentState<T extends Component> = T extends Component<infer State>
  ? State
  : unknown
type ChildStateSpec<T extends ComponentSpec> = {
  [k in keyof T]: ComponentState<T[k]>
}

// tslint:disable-next-line: typedef
export const AutoForward = <T extends ComponentSpec>(spec: T) => <
  State extends ChildStateSpec<T>,
  Params,
  Init extends any[],
  VNode
>(
  component: Component<State, Params, Init, VNode>
): Component<NState<State>, Params, Init, VNode> =>
  COM(
    (...t: Init) => ({
      '@@forward': {keys: Object.keys(spec)},
      ...component.init(...t)
    }),
    concatR(
      (act, state: any) => ({
        ...state,
        [act.type]: spec[act.type]
          ? spec[act.type].update(act.value, state[act.type])
          : state[act.type]
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
