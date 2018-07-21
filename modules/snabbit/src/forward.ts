import {Component} from './component'
import {Action, Nil, action} from 'action-type'
import {concatR, concatC} from 'update-function-types'

export const FORWARD_KEY_NAME = '@@forward'
export const forward = <VNode>(spec: {
  [key: string]: Component<any, any, VNode>
}) => <State extends any, Params>(
  component: Component<State, Params, VNode>
): Component<State, Params, VNode> => {
  const init = (p?: Partial<State>): State => {
    return Object.assign(
      {[FORWARD_KEY_NAME]: {keys: Object.keys(spec)}},
      component.init(p)
    )
  }
  const update = concatR<Action<any>, State>(
    (action, state) =>
      Object.assign({}, state, {
        [action.type]: spec[action.type]
          ? spec[action.type].update(action.value, state[action.type])
          : state[action.type]
      }),
    component.update
  )

  const command = concatC<any, State, any>((act, state) => {
    return spec[act.type]
      ? action(act.type, spec[act.type].command(act.value, state[act.type]))
      : Nil()
  }, component.command)

  const view = component.view
  return {init, update, view, command}
}
