import {ISmitten} from '../index'

import {DefaultEmitter} from './defaultEmitter'

/**
 * Class for an Emitter that is at Application Root
 */
export class RootEmitter implements ISmitten {
  public constructor(public readonly emit: (obj: unknown) => void) {}
  public of(type: string | number): ISmitten {
    return new DefaultEmitter(type, this)
  }
}
