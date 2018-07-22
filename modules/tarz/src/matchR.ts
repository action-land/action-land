/**
 * Created by tushar on 26/06/18
 */

import {isAction} from '@action-land/core'
import {curry2} from 'ts-curry'
import {ReducerFunction} from './ReducerFunction'

export type MatchActionRSpec<State> = {
  [key: string]: ReducerFunction<State>
}

export const matchR = <State>(spec: MatchActionRSpec<State>) =>
  curry2(
    (action: any, state: State): State =>
      isAction(action) && spec[action.type]
        ? spec[action.type](action.value, state)
        : state
  )
