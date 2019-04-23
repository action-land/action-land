import {IAction, isAction} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

/**
 * Defines structure of the spec that represents handlers for each action
 */
export interface IMatchActionSpec {
  [key: string]: (value: any) => any
}

export const match: CurriedFunction2<
  (t: any) => any,
  IMatchActionSpec,
  any
> = curry2(
  (base: (t: any) => any, spec: IMatchActionSpec) => (
    action: IAction<any>
  ): IMatchActionSpec =>
    isAction(action) && spec[action.type]
      ? spec[action.type](action.value)
      : base(action)
)
