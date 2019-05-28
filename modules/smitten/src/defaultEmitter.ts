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
    // tslint:disable-next-line: no-this-assignment
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
