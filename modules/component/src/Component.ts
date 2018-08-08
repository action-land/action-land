/**
 * Created by tushar on 08/08/18
 */

import {Smitten} from '@action-land/smitten'
import {CommandFunction, ReducerFunction} from '@action-land/tarz'

/**
 * Component interface.
 */

export class Component<
  State = any,
  Params = any,
  Init extends any[] = [],
  VNode = any
> {
  constructor(
    readonly init: (...t: Init) => State,
    readonly update: ReducerFunction<State>,
    readonly command: CommandFunction<State>,
    readonly view: (e: Smitten, m: State, p: Params) => VNode
  ) {}

  map<S, P, I extends any[], V>(
    fn: (
      component: Component<State, Params, Init, VNode>
    ) => Component<S, P, I, V>
  ): Component<S, P, I, V> {
    return fn(this)
  }
}

export const COM = <State, Params, Init extends any[], VNode>(
  init: (...t: Init) => State,
  update: ReducerFunction<State>,
  command: CommandFunction<State>,
  view: (e: Smitten, m: State, p: Params) => VNode
) => new Component(init, update, command, view)
