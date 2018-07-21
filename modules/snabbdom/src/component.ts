import {Action} from 'action-type'
import {Hoe} from 'hoe'

export interface Component<State, Params, VNode> {
  init(p?: Partial<State>): State
  update<T>(action: Action<T>, state: State): State
  command<T, R>(action: Action<T>, state: State): Action<R>
  view(e: Hoe, m: State, p: Params): VNode
}
