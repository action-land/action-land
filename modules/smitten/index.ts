/**
 * Created by tushar on 15/01/17.
 */

import {action} from '@action-land/core'

/**
 * Class that emits your view-actions
 */
export interface ISmitten<T extends string | number = string | number> {
  emit(obj: unknown): void
  of<S extends string | number>(type: T): ISmitten<S>
}

class DefaultEmitter implements ISmitten {
  public constructor(
    public readonly type: string | number,
    public readonly parent: DefaultEmitter | RootEmitter
  ) {}

  public emit = (value: unknown) => {
    let node: DefaultEmitter | RootEmitter = this
    let act = value
    while (node instanceof DefaultEmitter) {
      act = action(node.type, act)
      node = node.parent
    }
    node.emit(act)
  }
  public of(type: string | number): ISmitten {
    return new DefaultEmitter(type, this)
  }
}

class RootEmitter implements ISmitten {
  public constructor(public readonly emit: (obj: unknown) => void) {}

  public of(type: string | number): ISmitten {
    return new DefaultEmitter(type, this)
  }
}

// tslint:disable-next-line: no-any
export const create = (listener: (obj: any) => any): ISmitten =>
  new RootEmitter(listener)
