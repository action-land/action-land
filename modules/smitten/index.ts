/**
 * Created by tushar on 15/01/17.
 */

import {action} from '@action-land/core'

export interface Smitten {
  of(type: string | number): Smitten
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
  of(type: string | number): Smitten {
    return new DefaultEmitter(type, this)
  }
}

class RootEmitter implements Smitten {
  constructor(public readonly emit: (obj: any) => void) {}

  of(type: string | number): Smitten {
    return new DefaultEmitter(type, this)
  }
}

export const create = (listener: (obj: any) => any): Smitten => {
  return new RootEmitter(listener)
}
