/**
 * Created by tushar on 26/06/18
 */

import {Action} from 'action-type'
import {CurriedFunction2, curry2} from 'ts-curry'
import {ReducerFunction} from './ReducerFunction'

export type MatchActionRSpec<State> = {
  [key: string]: ReducerFunction<any, State>
}

export const matchR = <State>(
  spec: MatchActionRSpec<State>
): CurriedFunction2<Action<any>, State, State> =>
  curry2(
    (action: Action<any>, state: State) =>
      spec[action.type] ? spec[action.type](action.value, state) : state
  )
