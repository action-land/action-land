/**
 * Created by tushar on 26/06/18
 */

import {IAction, IActionType, isList, isNil, List, Nil} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

import {CommandFunction} from './commandFunction'

export const concatC = <State>(
  ...t: Array<CommandFunction<State>>
): CurriedFunction2<unknown, State, IAction<IActionType, unknown>> =>
  curry2(
    (input: unknown, state: State): IAction<IActionType, unknown> => {
      const result = []
      for (const item of t) {
        const act = item(input, state)
        if (isList(act)) {
          for (const value of act.value) {
            if (!isNil(value)) {
              result.push(value)
            }
          }
        } else if (!isNil(act)) {
          result.push(act)
        }
      }

      return result.length === 0
        ? Nil()
        : result.length === 1
        ? result[0]
        : List(...result)
    }
  )
