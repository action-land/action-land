import {Action, action} from './action'
import {isNil} from './isNil'
import {Nil} from './Nil'

/**
 * Action type for Nil
 * @constant
 */
export const LIST_ACTION_TYPE = '@@LIST'

/**
 * Creates a new Action from a list of actions
 * @function
 * @param  {... Action} actions
 * @returns {Action}
 */
export function List(
  ...actions: Array<Action<any, any>>
): Action<any, Array<Action<any, any>> | any> {
  const nActions: Array<Action<any, any>> = []
  for (let i = 0; i < actions.length; i++)
    if (!isNil(actions[i])) nActions.push(actions[i])
  return nActions.length === 0
    ? Nil()
    : nActions.length === 1
    ? nActions[0]
    : action(LIST_ACTION_TYPE, nActions)
}
