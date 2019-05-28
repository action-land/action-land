import {action} from '@action-land/core'

import {EmitValue, ISmitten} from '../index'

import {RootEmitter} from './rootEmitter'

/**
 * Class for an Emitter that's not at a root level
 */
export class DefaultEmitter implements ISmitten {
  public constructor(
    public readonly type: string | number,
    public readonly parent: DefaultEmitter | RootEmitter
  ) {}
  public emit = (value: EmitValue): void => {
    if (this instanceof RootEmitter) {
      this.emit(value)
    } else {
      let current = this.parent
      let act = action(this.type, value)
      while (current instanceof DefaultEmitter) {
        act = action(current.type, act)
        current = current.parent
      }
      current.emit(act)
    }
  }
  public of(type: string | number): ISmitten {
    return new DefaultEmitter(type, this)
  }
}
