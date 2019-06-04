/**
 * Created by tushar on 08/08/18
 */
import {IAction} from '@action-land/core'
import {ISmitten} from '@action-land/smitten'
import {CommandFunction, ReducerFunction} from '@action-land/tarz'

/**
 * Interface for Components.
 * Type Params:
 * - State: Shape of the Component's State. Ensure immutability.
 * - Params: Shape of the parameters-argument of the `view` function. Treat them immutably.
 * - Init: Arguments for the `init` method
 * - Node: Output Node from the `view` method
 */
export interface IComponent<
  State = unknown,
  Params = unknown,
  Init extends unknown[] = unknown[],
  Node = unknown
> {
  command<A, B>(a: A, s: State): IAction<B>
  init(...t: Init): State
  map<NewState, NewParams, NewInit extends unknown[], NewNode>(
    fn: (
      component: IComponent<State, Params, Init, Node>
    ) => IComponent<NewState, NewParams, NewInit, NewNode>
  ): IComponent<NewState, NewParams, NewInit, NewNode>
  update<A>(a: A, s: State): State
  view(e: ISmitten, m: State, p: Params): Node
}

class Component<
  State = unknown,
  Params = unknown,
  Init extends unknown[] = unknown[],
  VNode = unknown
> implements IComponent<State, Params, Init, VNode> {
  public constructor(
    public readonly init: (...t: Init) => State,
    public readonly update: ReducerFunction<State>,
    public readonly command: CommandFunction<State>,
    public readonly view: (e: ISmitten, m: State, p: Params) => VNode
  ) {}

  public map<S, P, I extends unknown[], V>(
    fn: (
      component: IComponent<State, Params, Init, VNode>
    ) => IComponent<S, P, I, V>
  ): IComponent<S, P, I, V> {
    return fn(this)
  }
}

export const COM = <State, Params, Init extends unknown[], VNode>(
  init: (...t: Init) => State,
  update: ReducerFunction<State>,
  command: CommandFunction<State>,
  view: (e: ISmitten, m: State, p: Params) => VNode
): IComponent<State, Params, Init, VNode> =>
  new Component(init, update, command, view)
