/**
 * Created by tushar on 25/06/18
 */

/**
 * A function that takes in a Value and a State and returns a new state
 * @param  action
 * @param  state
 * @return state
 */
export type ReducerFunction<Input, State> = {
  (input: Input, state: State): State
}
