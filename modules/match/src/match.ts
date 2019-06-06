import {isAction} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

import {hasOwnProperty} from '../../utils'

/**
 * Defines structure of the spec that represents handlers for each action
 */
export interface IMatchActionSpec {
  [key: string]: (value: unknown) => unknown
}

export const match: CurriedFunction2<
  (t: unknown) => unknown,
  IMatchActionSpec,
  // tslint:disable-next-line: no-any
  any
> = curry2(
  (base: (t: unknown) => unknown, spec: IMatchActionSpec) => (
    action: unknown
  ) =>
    isAction(action) && hasOwnProperty(action.type, spec)
      ? spec[action.type](action.value)
      : base(action)
)
