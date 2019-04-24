/**
 * Created by tushar on 05/07/18
 */

import {curry2} from 'ts-curry'

export const zeroR: {
  <T>(action: unknown, state: T): T
  <T>(action: unknown): (state: T) => T
} = curry2((a: unknown, b: unknown) => b)
