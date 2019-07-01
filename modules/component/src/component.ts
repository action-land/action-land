/**
 * Created by tushar on 08/08/18
 */

import {Action} from '@action-land/core'
import {Smitten} from '@action-land/smitten'
import {CommandFunction, ReducerFunction} from '@action-land/tarz'

/**
 * Component interface.
 */

export class Component<S1, P1, I1 extends unknown[], V> {
  constructor(
    readonly init: (...t: I1) => S1,
    readonly update: ReducerFunction<S1>,
    readonly command: CommandFunction<S1>,
    readonly view: (e: Smitten, m: S1, p: P1) => V
  ) {}

  /**
   * @deprecated Use Component.lift() instead
   */
  map<S2, P2, I2 extends any[]>(
    fn: (component: Component<S1, P1, I1, V>) => Component<S2, P2, I2, V>
  ): Component<S2, P2, I2, V> {
    return this.lift(fn)
  }

  lift<S2, P2, I2 extends any[]>(
    fn: (component: Component<S1, P1, I1, V>) => Component<S2, P2, I2, V>
  ): Component<S2, P2, I2, V> {
    return fn(this)
  }
}

export const COM = <State, Params, Init extends any[], VNode>(
  init: (...t: Init) => State,
  update: ReducerFunction<State>,
  command: CommandFunction<State>,
  view: (e: Smitten, m: State, p: Params) => VNode
) => new Component(init, update, command, view)
