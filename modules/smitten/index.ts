/**
 * Created by tushar on 15/01/17.
 */

import {action} from '@action-land/core'

/**
 * Class that emits your view-actions
 */
export interface Smitten<T extends string | number = string | number> {
  emit(obj: any): void
  of<S extends string | number>(type: T): Smitten<S>
}

class DefaultEmitter implements Smitten {
  public constructor(
    public readonly type: string | number,
    public readonly parent: DefaultEmitter | RootEmitter
  ) {}

  public emit = (value: any): void => {
    // tslint:disable-next-line: no-this-assignment
    let node: DefaultEmitter | RootEmitter = this
    let act = value
    while (node instanceof DefaultEmitter) {
      act = action(node.type, act)
      node = node.parent
    }
    node.emit(act)
  }
  public of(type: string | number): Smitten {
    return new DefaultEmitter(type, this)
  }
}

class RootEmitter implements Smitten {
  public constructor(public readonly emit: (obj: any) => void) {}

  public of(type: string | number): Smitten {
    return new DefaultEmitter(type, this)
  }
}

export const create = (listener: (obj: any) => any): Smitten =>
  new RootEmitter(listener)
