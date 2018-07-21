/**
 * Created by tushar on 25/06/18
 */
import {ReducerFunction} from './ReducerFunction'
import {CurriedFunction2, curry2} from 'ts-curry'

/**
 * Concatenates 2 or more ReducerFunction(s) and returns a new ReducerFunction.
 * @param t ReducerFunction[]
 * @return ReducerFunction
 */
export const concatR = <Value, State>(
  ...t: Array<ReducerFunction<Value, State>>
): CurriedFunction2<Value, State, State> =>
  curry2((a: Value, b: State) => {
    let result: State = b
    for (let i = 0; i < t.length; i++) result = t[i](a, result)
    return result
  })
