/**
 * Created by tushar on 15/01/17.
 */

import {action} from '@action-land/core'

export interface Smitten<T extends string | number = string | number> {
  /**
   * Return a new instance of Smitten
   * @param type
   */
  of<S extends string | number>(type: T): Smitten<S>
  /**
   * Dispatch an action based on type hierarchy
   * @param obj Value to be set in a leaf action of the action dispatched
   */
  emit(obj: any): void
}

class DefaultEmitter implements Smitten {
  constructor(
    readonly type: string | number,
    readonly parent: DefaultEmitter | RootEmitter
  ) {}

  emit = (value: any) => {
    let node: DefaultEmitter | RootEmitter = this
    let act = value
    while (node instanceof DefaultEmitter) {
      act = action(node.type, act)
      node = node.parent
    }
    node.emit(act)
  }
  /**
   * Return a new instance of Smitten
   * @param type
   */
  of(type: string | number): Smitten {
    return new DefaultEmitter(type, this)
  }
}

class RootEmitter implements Smitten {
  constructor(public readonly emit: (obj: any) => void) {}
  /**
   * Return a new instance of Smitten
   * @param type
   */
  of(type: string | number): Smitten {
    return new DefaultEmitter(type, this)
  }
}

export const create = (listener: (obj: any) => any): Smitten => {
  return new RootEmitter(listener)
}
