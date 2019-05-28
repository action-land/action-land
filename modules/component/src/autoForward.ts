import {COM, Component} from '@action-land/component'
import {action, isAction, Nil} from '@action-land/core'
import {
  CommandFunction,
  concatC,
  concatR,
  ReducerFunction
} from '@action-land/tarz'

import {hasOwnProperty} from '../../utils'

type NState<T> = T & {'@@forward': {keys: string[]}}
interface IComponentSpec {
  [key: string]: Component
}

type ComponentState<T extends Component> = T extends Component<infer State>
  ? State
  : unknown
type ChildStateSpec<T extends IComponentSpec> = {
  [k in keyof T]: ComponentState<T[k]>
}

export const AutoForward = <T extends IComponentSpec>(spec: T) => <
  State extends ChildStateSpec<T>,
  Params,
  Init extends unknown[],
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
      (act: unknown, state: NState<State>) =>
        isAction(act) && hasOwnProperty(act.type, spec)
          ? {
              ...state,
              // tslint:disable-next-line: no-unsafe-any
              [act.type]: spec[act.type].update(act.value, state[act.type])
            }
          : state,
      (act: unknown, state: NState<State>) => ({
        ['@@forward']: state['@@forward'],
        ...component.update(act, state)
      })
    ),
    concatC(
      (act: unknown, state: NState<State>) =>
        isAction(act) && hasOwnProperty(act.type, spec)
          ? action(act.type, spec[act.type].command(act.value, state[act.type]))
          : Nil(),
      component.command
    ),
    component.view
  )
