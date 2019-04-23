/**
 * Created by tushar on 05/07/18
 */

import {IAction, Nil} from '@action-land/core'
import {curry2} from 'ts-curry'

export const zeroC: {
  <T>(action: any, state: T): IAction<any>
  <T>(action: any): (state: T) => IAction<any>
} = curry2((action: any, state: any) => Nil())
