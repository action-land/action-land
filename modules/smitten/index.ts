/**
 * Created by tushar on 15/01/17.
 */

import {action} from '@action-land/core'

export interface Smitten<T extends string | number = string | number> {
  of<S extends string | number>(type: T): Smitten<S>
  emit(obj: any): void
}

class DefaultEmitter implements Smitten {
  private cache: {
    [key: string]: DefaultEmitter
  }

  constructor(
    readonly type: string | number,
    readonly parent: DefaultEmitter | RootEmitter
  ) {
    this.cache = {}
  }

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
    if (this.cache.hasOwnProperty(type)) {
      return this.cache[type]
    }

    const newEmitter = new DefaultEmitter(type, this)
    this.cache[type] = newEmitter
    return newEmitter
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
