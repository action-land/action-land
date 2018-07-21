/**
 * Created by tushar on 26/06/18
 */

import {Action, Nil} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'
import {CommandFunction} from './CommandFunction'

export type MatchActionCSpec<State> = {
  [key: string]: CommandFunction<any, State, any>
}

export const matchC = <State>(
  spec: MatchActionCSpec<State>
): CurriedFunction2<Action<any>, State, Action<any>> =>
  curry2(
    (action: Action<any>, state: State) =>
      spec[action.type] ? spec[action.type](action.value, state) : Nil()
  )
