/**
 * Created by tushar on 05/07/18
 */

import {IAction, INilAction, Nil} from '@action-land/core'
import {curry2} from 'ts-curry'

export const zeroC: {
  <T>(action: unknown, state: T): INilAction
  <T>(action: unknown): (state: T) => INilAction
} = curry2((action: unknown, state: unknown) => Nil())
