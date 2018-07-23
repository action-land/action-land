import {create, Hoe} from '@action-land/smitten'
import {CommandFunction, ReducerFunction} from '@action-land/tarz'

export interface Component<State, Params, VNode> {
  init(p?: Partial<State>): State
  update: ReducerFunction<State>
  command: CommandFunction<State>
  view(e: Hoe, m: State, p: Params): VNode
}
