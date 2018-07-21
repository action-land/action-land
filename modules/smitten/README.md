# @action-land/smitten

**smitten** is an action emitter library. It helps emit actions from virtual dom components in an efficient and elegant manner.

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Action](#action)
- [Example](#example)
- [API](#api)

# Installation

**via npm:**

```bash
$ npm install @action-land/smitten --save
```

# Usage

```jsx
import * as smitten from '@action-land/smitten'

// Logs the `Actions`
const actionListener = action => {
  console.log(action)
}

// Creating a new instance
const emitter = smitten.create(actionListener)

// Sample Usage
const component = (emitter) => (
  <div>
    <button onClick={emitter.of('hello').emit}>Hello</button>
    <button onClick={emitter.of('bye').emit}>Bye</button>
  <div>
)

// vNode being returned from the component
const vNode = component(emitter)
```

On clicking on buttons, the `actionListener` logs the following `Action`s —

```js
// Hello
{type: 'hello', value: [ClickEvent]}

// Bye
{type: 'bye', value: [ClickEvent]}
```

The `value` in this case is the actual click event.

# Action

Smitten converts DOM Events into an [Action](https://github.com/action-land/action-land/blob/master/modules/core/README.md#action-type). An `Action` has two properties —

- `type` : Its a `string|number` identifier which depicts the originator of event. For example — if an event is fired from the side navigation, the corresponding `Action` could have a `type` as `SIDE_NAV`.
- `value`: Value is the payload that needs to be transmitted via the `Action`. In most cases it would be the DOM event. In some cases the value it self could be an `Action`. This is especially useful when the nesting of components is really deep and one would like to namespace actions based on the hierarchy of components.

# API

## smitten.create(actionListener)

This is the constructor function for creating the action emitter. It takes in a single listener and returns an instance of `Smitten`.

**Usage**

```js
import * as smitten from '@action-land/smitten'

const actionListener = event => {
  // do something with that event
}

const emitter = smitten.create(actionListener) // returns a Smitten
```

## emitter.of(type)

It takes in a `type` which is of type `string|number` and returns a new instance of `Smitten`. For Eg:

```js
import * as smitten from '@action-land/smitten'

const h0 = smitten.create(listener)
const h1 = h0
  .of('A')
  .of('B')
  .of('C')
```

## emitter.emit(value)

It is available on all `Smitten` instances. It takes in any `value` and based on the `type` it dispatches an `action`.
