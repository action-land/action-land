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
): CurriedFunction2<any, State, State> =>
  curry2(
    (a: any, b: State): State => {
      let result: State = b
      for (let i = 0; i < t.length; i++) result = t[i](a, result)
      return result
    }
  )
