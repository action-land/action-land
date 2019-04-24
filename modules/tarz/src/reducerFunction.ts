/**
 * Created by tushar on 25/06/18
 */

/**
 * A function that takes in a Value and a State and returns a new state
 * @param: action
 * @param: Old state
 */
// tslint:disable-next-line: no-any
export type ReducerFunction<State, Input = any> = (
  input: Input,
  state: State
) => State
