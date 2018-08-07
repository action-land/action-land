# @action-land/component

[Action] based functional components

[action]: https://github.com/action-land/action-land

# Installation

```bash
npm i @action-land/component
```

# Usage

```ts
import {Nil} from '@action-land/core'
import {COM} from '@action-land/component'

// component is created using the COM constructor function
const component = COM(
  () => ({count: 0}),
  (a, s) => ({...s, count: count + 1}),
  () => Nil(),
  (s: Smitten, m: {count: 0}, p: {color: string}) => 'Hello World' + m.count
)

// component can be transformed using map()
const crazyComponent = component.map(component =>
  COM(
    (...t) => Object.assign({crazy: true}, component.init(...t)),
    component.update,
    component.command,
    component.view
  )
)
```

# API

## Component

A component is set of 4 pure functions —

1.  `init`: Creates the initial state of the component.
2.  `update`: Is a [reducer function].
3.  `command`: Is a [command function].
4.  `view`: Takes in the state and other params and returns a virtual dom element.
5.  Components are framework agnostic.

[command function]: https://github.com/action-land/action-land/blob/master/modules/tarz/README.md#command-function
[reducer function]: https://github.com/action-land/action-land/blob/master/modules/tarz/README.md#reducer-function

```ts
export interface Component<State, Params, Args extends any[], VNode> {
  init(...t: Args): State
  update<T>(action: Action<T>, state: State): State
  command<T, R>(action: Action<T>, state: State): Action<R>
  view(e: Hoe, m: State, p: Params): VNode
  map<S, P, A, V>(
    t: Component<State, Params, Args, VNode>
  ): Component<S, P, A, V>
}
```

## init()

1.  Can take in any number of arguments.
2.  Returns the initial version of the `State`.

```ts
function init(...t: any[]): State
```

## update()

1.  Its an [update function] that takes in an [Action] and a `State` and returns a new `State`.

```ts
function update(action: Action, state: State): State
```

## command()

1.  Its an [command function] that takes in an [Action] and a `State` and returns a new [Action].

```ts
function command(action: Action, state: State): Action
```

## view()

1.  Takes in three arguments — `Hoe`, `State` and `Params`.
2.  Returns a new virtual dom element — `VNode`.
3.  `VNode` can be anything implementation from [React], [snabbdom] etc.

```ts
function view(e: Hoe, s: State, p: Params): VNode
```
