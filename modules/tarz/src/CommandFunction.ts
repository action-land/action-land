/**
 * Created by tushar on 25/06/18
 */

import {Action} from '@action-land/core'

/**
 * A function that takes in an Action and a State and returns a new Action
 * @param  action
 * @param  state
 * @return action
 */

export type CommandFunction<State, Input = any, Output = any> = {
  (input: Input, state: State): Action<any, Output>
}
