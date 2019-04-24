/**
 * Created by tushar on 26/06/18
 */

import {isAction} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

import {hasOwnProperty} from '../../utils'

import {ReducerFunction} from './reducerFunction'

/**
 * Spec of Reducers for each Action that needs to be handled
 */
export interface IMatchActionRSpec<State> {
  [key: string]: ReducerFunction<State>
}

export const matchR = <State = unknown>(
  spec: IMatchActionRSpec<State>
): CurriedFunction2<unknown, State, State> =>
  curry2(
    (action: unknown, state: State): State =>
      isAction(action) && hasOwnProperty(action.type, spec)
        ? spec[action.type](action.value, state)
        : state
  )
