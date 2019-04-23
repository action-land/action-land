import {Action, action} from './action'
import {isNil} from './isNil'
import {Nil} from './nil'

/**
 * Action type for Nil
 */
export const LIST_ACTION_TYPE = '@@LIST'

/**
 * Creates a new Action from a list of actions
 * @param: List of Actions
 */
export function List(
  ...actions: Array<Action<any>>
): Action<Array<Action<any>> | any> {
  const nActions: Array<Action<any>> = []
  for (let i = 0; i < actions.length; i++) {
    if (!isNil(actions[i])) {
      nActions.push(actions[i])
    }
  }

  return nActions.length === 0
    ? Nil()
    : nActions.length === 1
    ? nActions[0]
    : action(LIST_ACTION_TYPE, nActions)
}
