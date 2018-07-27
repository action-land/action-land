import {create, Hoe} from '@action-land/smitten'
import {CommandFunction, ReducerFunction} from '@action-land/tarz'

/**
 * Component interface.
 */
export interface Component<
  State = {},
  Params = {},
  VNode = {},
  StateParams = {}
> {
  init(): State
  init(p: StateParams): State
  update: ReducerFunction<State>
  command: CommandFunction<State>
  view(e: Hoe, m: State, p: Params): VNode
}
