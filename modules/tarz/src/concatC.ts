/**
 * Created by tushar on 26/06/18
 */

import {Action, isList, isNil, List, Nil} from '@action-land/core'
import {CommandFunction} from './CommandFunction'
import {CurriedFunction2, curry2} from 'ts-curry'

export const concatC = <State, Input, Output>(
  ...t: Array<CommandFunction<State, Input, Output>>
) =>
  curry2((input: Input, state: State) => {
    const result: Array<Action<Output>> = []
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
