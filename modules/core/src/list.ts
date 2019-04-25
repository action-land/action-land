import {action, IAction, IActionType} from './action'
import {isNil} from './isNil'
import {INilAction, Nil} from './nil'

export type LIST_TYPE = '@@LIST'
export const LIST = '@@LIST'
/**
 * Interface for a List Action
 */
export interface IListAction
  extends IAction<string, Array<IAction<IActionType, unknown>>> {
  type: LIST_TYPE
  value: Array<IAction<IActionType, unknown>>
}

/**
 * Creates a new Action from a list of actions
 * @param: List of Actions
 */
export function List<T>(
  ...actions: Array<IAction<IActionType, T>>
): IListAction | IAction<IActionType, T> | INilAction {
  const nActions = []
  for (const act of actions) {
    if (!isNil(act)) {
      nActions.push(act)
    }
  }

  return nActions.length === 0
    ? Nil()
    : nActions.length === 1
    ? nActions[0]
    : action(LIST, nActions)
}
