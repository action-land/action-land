/**
 * Created by tushar on 25/06/18
 */

import {IAction, IActionType} from '@action-land/core'

/**
 * A function that takes in an Action and a State and returns a new Action
 * @param: action
 * @param: current state
 */
// tslint:disable-next-line: no-any
export type CommandFunction<State, Input = any, Output = any> = (
  input: Input,
  state: State
) => IAction<IActionType, Output>
