import {Action, isAction} from '@action-land/core'
import {CurriedFunction2, curry2} from 'ts-curry'

export type MatchActionSpec = {
  [key: string]: {(value: any): any}
}

export const match: CurriedFunction2<
  (t: any) => any,
  MatchActionSpec,
  any
> = curry2(
  (base: (t: any) => any, spec: MatchActionSpec) => (
    action: Action<any, any>
  ) =>
    isAction(action) && spec[action.type]
      ? spec[action.type](action.value)
      : base(action)
)
