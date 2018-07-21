/**
 * Created by tushar on 25/06/18
 */

import {Action} from 'action-type'

/**
 * A function that takes in an Action and a State and returns a new Action
 * @param  action
 * @param  state
 * @return action
 */

export type CommandFunction<Input, State, Output> = {
  (input: Input, state: State): Action<Output>
}
