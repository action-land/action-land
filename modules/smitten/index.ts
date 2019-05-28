/**
 * Created by tushar on 15/01/17.
 */

import {IAction} from '@action-land/core'

import {RootEmitter} from './src/rootEmitter'

export type EmitValue = string | number | IAction<unknown>

/**
 * Class that emits your view-actions
 */
export interface ISmitten<T extends string | number = string | number> {
  emit(obj: EmitValue): void
  of<S extends string | number>(type: T): ISmitten<S>
}

export const create = (listener: (obj: EmitValue) => void): ISmitten =>
  new RootEmitter(listener)
