import {IAction} from './action'

export type NIL_TYPE = '@@NIL'
export const NIL = '@@NIL'

/**
 * INilAction is a specific Sub-Type of IAction<>
 */
export interface INilAction extends IAction<string, null> {
  type: NIL_TYPE
  value: null
}

/**
 * Returns a Nil object
 */
export const Nil = (): INilAction => ({type: '@@NIL', value: null})
