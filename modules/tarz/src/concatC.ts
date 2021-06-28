/**
 * Created by tushar on 26/06/18
 */

import {Action, isList, isNil, List, Nil} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'
import {CommandFunction} from './commandFunction'

export const concatC = <State>(
  ...t: Array<CommandFunction<State>>
): CurriedFunction2<any, State, Action<any>> =>
  curry2((input: any, state: State): Action<{}> => {
    const result: Array<Action<any>> = []
    for (let i = 0; i < t.length; i++) {
      const item = t[i](input, state)
      if (isList(item))
        for (let i = 0; i < item.value.length; i++) {
          if (!isNil(item.value[i])) result.push(item.value[i])
        }
      else if (!isNil(item)) result.push(item)
    }

    return result.length === 0
      ? Nil()
      : result.length === 1
      ? result[0]
      : List(...result)
  })
