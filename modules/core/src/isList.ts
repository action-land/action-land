import {IAction, IActionType} from './action'
import {isAction} from './isAction'
import {IListAction, LIST} from './list'

/**
 * Checks if input is of type IListAction
 * @param: Object to test
 */
export const isList = (obj: unknown): obj is IListAction =>
  isAction(obj) &&
  obj.type === LIST &&
  Array.isArray(obj.value) &&
  obj.value.every(isAction)
