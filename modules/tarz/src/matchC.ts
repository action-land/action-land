/**
 * Created by tushar on 26/06/18
 */

import {Action, isAction, Nil} from '@action-land/core'
import {curry2} from 'ts-curry'
import {CommandFunction} from './CommandFunction'

export type MatchActionCSpec<State> = {
  [key: string]: CommandFunction<State>
}

export const matchC = <State>(spec: MatchActionCSpec<State>) =>
  curry2(
    (action: any, state: State): Action<{}> =>
      isAction(action) && spec[action.type]
        ? spec[action.type](action.value, state)
        : Nil()
  )
