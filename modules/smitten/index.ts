/**
 * Created by tushar on 15/01/17.
 */

import {RootEmitter} from './src/rootEmitter'

/**
 * Class that emits your view-actions
 */
export interface ISmitten<T extends string | number = string | number> {
  emit(obj: unknown): void
  of<S extends string | number>(type: T): ISmitten<S>
}

// tslint:disable-next-line: no-any
export const create = (listener: (obj: any) => void): ISmitten =>
  new RootEmitter(listener)
