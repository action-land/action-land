import {create, Smitten} from '@action-land/smitten'
import {CommandFunction, ReducerFunction} from '@action-land/tarz'

/**
 * Component interface.
 */
export interface Component<State = {}, Params = {}, VNode = {}> {
  init<T extends any[]>(...t: T): State
  update: ReducerFunction<State>
  command: CommandFunction<State>
  view(e: Smitten, m: State, p: Params): VNode
}
