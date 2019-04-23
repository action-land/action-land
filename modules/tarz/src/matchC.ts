/**
 * Created by tushar on 26/06/18
 */

import {IAction, isAction, Nil} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

import {CommandFunction} from './CommandFunction'

/**
 * Spec of Thunks for each Command that needs to be handled
 */
export interface IMatchActionCSpec<State> {
  [key: string]: CommandFunction<State>
}

export const matchC = <State>(
  spec: IMatchActionCSpec<State>
): CurriedFunction2<any, State, IAction<any>> =>
  curry2(
    (action: any, state: State): IAction<{}> =>
      isAction(action) && spec[action.type]
        ? spec[action.type](action.value, state)
        : Nil()
  )
