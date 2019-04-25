/**
 * Created by tushar on 26/06/18
 */

import {IAction, IActionType, isAction, Nil} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

import {hasOwnProperty} from '../../utils'

import {CommandFunction} from './commandFunction'

/**
 * Spec of Thunks for each Command that needs to be handled
 */
export interface IMatchActionCSpec<State> {
  [key: string]: CommandFunction<State>
}

export const matchC = <State>(
  spec: IMatchActionCSpec<State>
): CurriedFunction2<unknown, State, IAction<IActionType, unknown>> =>
  curry2((action: unknown, state: State) =>
    isAction(action) && hasOwnProperty(action.type, spec)
      ? spec[action.type](action.value, state)
      : Nil()
  )
