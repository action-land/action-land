/**
 * Created by tushar on 26/06/18
 */

import {IAction, isAction} from '@action-land/core'
import {curry2} from 'ts-curry'
import {hasOwnProperty} from '../../utils'

/**
 * Spec of Reducers for each Action that needs to be handled
 */

type InferValues<T> = T[keyof T]
type InferArg<T> = T extends (...t: infer S) => unknown ? S : Date
type InferHead<T> = T extends [infer S, unknown] ? IAction<S> : Date
type InferTail<T> = T extends [unknown, infer S] ? S : Date
type InferFirstArg<T> = InferHead<InferArg<InferValues<T>>>
type InferSecondArg<T> = InferTail<InferArg<InferValues<T>>>

export const matchR = <T extends object>(spec: T) =>
  curry2(
    (
      action: InferFirstArg<typeof spec>,
      state: InferSecondArg<typeof spec>
    ): InferSecondArg<typeof spec> =>
      isAction(action) && hasOwnProperty(action.type, spec)
        ? spec[action.type](action.value, state)
        : state
  )
