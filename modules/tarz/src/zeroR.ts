/**
 * Created by tushar on 05/07/18
 */

import {curry2} from 'ts-curry'

export const zeroR: {
  <T>(action: any, state: T): T
  <T>(action: any): {(state: T): T}
} = curry2((a: any, b: any) => b)
