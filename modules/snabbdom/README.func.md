# Update Function Types [![Build Status](https://travis-ci.com/tusharmath/update-function-types.svg?branch=master)](https://travis-ci.com/tusharmath/update-function-types)

Provides a specification and basic type classes for update function.
Essentially there are two kinds of update functions —

1.  `ReducerFunction`: takes in `action` and `state` and returns a new `state`.
2.  `CommandFunction`: takes in `action` and `state` and return a new `action`.

# Index

- [Types](#types)
  - [ReducerFunction](#reducer-function)
  - [CommandFunction](#command-function)
- [Library Functions](#library-functions)
  - [concatR](#concatr)
  - [concatC](#concatc)
  - [matchR](#matchr)
  - [matchC](#matchc)
  - [zeroR](#zeror)
  - [zeroC](#zeroc)

# Types

## Reducer Function

1.  Takes two arguments viz. `Value` and `State`.
2.  Always return a `State`.
3.  Does not mutate the original objects provided.

```ts
export type ReducerFunction<Value, State> = {
  (value: Value, state: State): State
}
```

## Command Function

1.  Takes two arguments only viz. `Value` and `State`.
2.  Always returns an `Action`. It can consider returning **[Nil]** if no meaningful value is intended.
3.  Does not mutate the original objects provided.

```ts
export type CommandFunction<Value, State, Output> = {
  (value: Value, state: State): Action<Output>
}
```

[nil]: https://github.com/tusharmath/action-type#nil

# Library Functions

## concatR

Takes in multiple `ReducerFunction`(s) as arguments and returns a new `ReducerFunction` as a result.

1.  Consider the `ReducerFunction`(s) `R0` `R1` then two statements will be logically equivalent —
    1.  `concatR(R0, R1)(action, state)`
    2.  `R1(action, R0(action, state))`
2.  Its associative — `concatR(concatR(R0, R1), R2) === concatR(R0, concatR(R1, R2))`
3.  Its additive — `concatR(R0, zeroR) === R0`.

**Usage**

```ts
import {concatR} from 'update-function-type'

const R0 = (a, b) => a + b
const R1 = (a, b) => a * b

concatR(R0, R1)(10, 20) // 10 * (10 + 20) === 300
```

## concatC

Takes in multiple `CommandFunction`(s) as arguments and returns a new `CommandFunction` as a result.

1.  Consider the `CommandFunction`(s) `C0` `C1` then two statements will be logically equivalent —
    1.  `concatC(C0, C1)(action, state)`
    2.  `List(C0(action, state), C1(action, state))`
2.  Its associative — `concatC(concatC(C0, C1), C2) === concatC(C0, concatC(C1, C2))`
3.  Its additive — `concatC(C0, zeroC) === C0`

**Usage**

```ts
import {concatC} from 'update-function-type'

const C0 = (a, b) => action('+', a + b)
const C1 = (a, b) => action('*', a * b)

concatC(C0, C1)(10, 500) // List(action('+', 510), action('B', 5000))
```

## matchR

1.  Takes in specification object with keys as action types and values as `ReducerFunction`(s) and returns another `ReducerFunction`.
2.  The returned function when called with an `Action` and `State` internally calls the function matching the action's type.
3.  The matching reducer function is called with value of the original action and the state is passed as is.
4.  In case no action matches the given specification the original state is returned.

**Usage**

```ts
import {matchR} from 'update-function-type'

const reducer = matchR({
  add: (a, b) => a + b,
  mul: (a, b) => a * b
})

reducer(action('add', 10), 1000) // returns 1010
```

## matchC

1.  Takes in specification object with keys as action types and values as `CommandFunction`(s) and returns another `CommandFunction`.
2.  The returned function when called with an `Action` and `State` internally calls the function matching the action's type.
3.  The matching reducer function is called with value of the original action and the state is passed as is.
4.  In case no action matches the given specification [Nil] is returned.

**Usage**

```ts
import {matchC} from 'update-function-type'

const reducer = matchR({
  add: (a, b) => action('added', a + b),
  mul: (a, b) => action('multiplied', a * b)
})

reducer(action('add', 10), 1000) // returns action('added', 1010)
```

## zeroR

1.  Is a `ReducerFunction`.
2.  Takes in an `action` and a `state` and returns the same state.

## zeroC

1.  Is a `CommandFunction`.
2.  Takes in an `action` and a `state` and returns the same `action`.
