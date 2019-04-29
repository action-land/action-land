/**
 * Created by tushar on 15/01/17.
 */

import {action} from '@action-land/core'

export interface Smitten<T extends string | number = string | number> {
  of<S extends string | number>(type: T): Smitten<S>
  emit(obj: any): void
}

class DefaultEmitter implements Smitten {
  constructor(
    readonly type: string | number,
    readonly parent: DefaultEmitter | RootEmitter,
    private readonly cache: {
      [key: string]: Smitten
    } = {}
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
    if (!this.cache.hasOwnProperty(type)) {
      this.cache[type] = new DefaultEmitter(type, this)
    }

    return this.cache[type]
  }
}

class RootEmitter implements Smitten {
  constructor(
    public readonly emit: (obj: any) => void,
    private readonly cache: {
      [key: string]: Smitten
    } = {}
  ) {}

  of(type: string | number): Smitten {
    if (!this.cache.hasOwnProperty(type)) {
      this.cache[type] = new DefaultEmitter(type, this)
    }

    return this.cache[type]
  }
}

export const create = (listener: (obj: any) => any): Smitten => {
  return new RootEmitter(listener)
}
