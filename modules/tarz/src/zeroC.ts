/**
 * Created by tushar on 05/07/18
 */

import {Action, Nil} from '@action-land/core'
import {curry2} from 'ts-curry'

export const zeroC: {
  <T>(action: any, state: T): Action<any, any>
  <T>(action: any): {(state: T): Action<any, any>}
} = curry2((action: any, state: any) => Nil())
