/**
 * Created by tushar on 26/06/18
 */

import {Action, isList, isNil, List, Nil} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

import {CommandFunction} from './commandFunction'

export const concatC = <State>(
  ...t: Array<CommandFunction<State>>
): CurriedFunction2<any, State, Action<any>> =>
  curry2(
    (input: any, state: State): Action<{}> => {
      const result: Array<Action<any>> = []
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
