import {action, IAction} from './action'
import {isAction} from './isAction'
import {isNil} from './isNil'
import {INilAction, Nil} from './nil'

/**
 * Action type for Nil
 */
export const LIST_ACTION_TYPE = '@@LIST'

/**
 * Creates a new Action from a list of actions
 * @param: List of Actions
 */
export function List(...actions: INilAction[]): INilAction
export function List<T>(
  ...actions: Array<IAction<T>>
): IAction<Array<IAction<T>>> | IAction<T>
export function List(...actions: unknown[]): IAction<unknown> {
  const nActions: Array<IAction<unknown>> = []
  actions.forEach(act => {
    if (isAction(act) && !isNil(act)) {
      nActions.push(act)
    }
  })

  return nActions.length === 0
    ? Nil()
    : nActions.length === 1
    ? nActions[0]
    : action(LIST_ACTION_TYPE, nActions)
}
