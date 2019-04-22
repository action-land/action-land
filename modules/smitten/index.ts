/**
 * Created by tushar on 15/01/17.
 */

import {action} from '@action-land/core'

export interface Smitten<T extends string | number = string | number> {
  of<S extends string | number>(type: T): Smitten<S>
  emit(obj: any): void
  bindTo<S extends string | number>(value: any): Smitten<S>
}

class DefaultEmitter implements Smitten {
  private returnValue: any

  constructor(
    readonly type: string | number,
    readonly parent: DefaultEmitter | RootEmitter
  ) {
    this.returnValue = null
  }

  bindTo<S extends string | number>(value: any): Smitten<S> {
    this.returnValue = value
    return this
  }

  emit = (value: any) => {
    let node: DefaultEmitter | RootEmitter = this
    let act = this.returnValue === null ? value : this.returnValue
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

  bindTo<S extends string | number>(value: any): Smitten<S> {
    return this
  }

  of(type: string | number): Smitten {
    return new DefaultEmitter(type, this)
  }
}

export const create = (listener: (obj: any) => any): Smitten => {
  return new RootEmitter(listener)
}
