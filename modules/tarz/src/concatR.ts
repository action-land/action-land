/**
 * Created by tushar on 25/06/18
 */
import {CurriedFunction2, curry2} from 'ts-curry'

import {ReducerFunction} from './reducerFunction'

/**
 * Concatenates 2 or more ReducerFunction(s) and returns a new ReducerFunction.
 * @param t ReducerFunction[]
 * @return ReducerFunction
 */
export const concatR = <State>(
  ...t: Array<ReducerFunction<State>>
): CurriedFunction2<unknown, State, State> =>
  curry2(
    (a: unknown, b: State): State => {
      let result: State = b
      t.forEach((reducer: ReducerFunction<State>) => {
        result = reducer(a, result)
      })

      return result
    }
  )
