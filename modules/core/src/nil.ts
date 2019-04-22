import {IAction} from './action'

export const NIL_TYPE = '@@NIL'

/**
 * INilAction is a specific Sub-Type of IAction<>
 */
export interface INilAction extends IAction<{}> {
  type: '@@NIL'
  value: {}
}

/**
 * Returns a Nil object
 */
export const Nil = (): INilAction => ({type: NIL_TYPE, value: {}})
