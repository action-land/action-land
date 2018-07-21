# Action Component

[![Greenkeeper badge](https://badges.greenkeeper.io/tusharmath/action-component.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.com/tusharmath/action-component.svg?branch=master)](https://travis-ci.com/tusharmath/action-component)

[Action] based functional components

[Action]: https://github.com/tusharmath/action-type

## Component

A component is set of 4 pure functions —

1. `init`: Creates the initial state of the component.
2. `update`: Is a [reducer function].
3. `command`: Is a [command function].
4. `view`: Takes in the state and other params and returns a virtual dom element.
5. Components are framework agnostic.

[command function]: https://github.com/tusharmath/update-function-types#command-function
[reducer function]: https://github.com/tusharmath/update-function-types#reducer-function

```ts
export interface Component<State, Params, VNode> {
  init(p?: Partial<State>): State
  update<T>(action: Action<T>, state: State): State
  command<T, R>(action: Action<T>, state: State): Action<R>
  view(e: Hoe, m: State, p: Params): VNode
}
```

## init()

1. Takes in one argument which contains a partial version of the `State`, ie. all properties are optional.
2. Returns a new version of the `State`.

```ts
function init(p?: Partial<State>): State
```

## update()

1. Its an [update function] that takes in an [Action] and a `State` and returns a new `State`.

```ts
 function update (action: Action, state: State): State
```

## command()

1. Its an [command function] that takes in an [Action] and a `State` and returns a new [Action].

```ts
 function command (action: Action, state: State): Action
```

## view()

1. Takes in three arguments — `Hoe`, `State` and `Params`.
2. Returns a new virtual dom element — `VNode`.
3. `VNode` can be anything implementation from [React], [snabbdom] etc.

```ts
function view(e: Hoe, s: State, p: Params): VNode
```
