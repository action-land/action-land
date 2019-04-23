/**
 * Created by tushar on 26/06/18
 */

import {isAction} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

import {ReducerFunction} from './ReducerFunction'

export interface MatchActionRSpec<State> {
  [key: string]: ReducerFunction<State>
}

export const matchR = <State>(
  spec: MatchActionRSpec<State>
): CurriedFunction2<any, State, State> =>
  curry2(
    (action: any, state: State): State =>
      isAction(action) && spec[action.type]
        ? spec[action.type](action.value, state)
        : state
  )
