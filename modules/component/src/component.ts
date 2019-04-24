/**
 * Created by tushar on 08/08/18
 */
import {ISmitten} from '@action-land/smitten'
import {CommandFunction, ReducerFunction} from '@action-land/tarz'

// tslint:disable:no-any

/**
 * Component interface.
 */
export class Component<
  State = any,
  Params = any,
  Init extends any[] = any,
  VNode = any
> {
  public constructor(
    public readonly init: (...t: Init) => State,
    public readonly update: ReducerFunction<State>,
    public readonly command: CommandFunction<State>,
    public readonly view: (e: ISmitten, m: State, p: Params) => VNode
  ) {}

  public map<S, P, I extends any[], V>(
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
  view: (e: ISmitten, m: State, p: Params) => VNode
): Component<State, Params, Init, VNode> =>
  new Component(init, update, command, view)
