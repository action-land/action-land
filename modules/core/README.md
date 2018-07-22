# @action-type/core

Core library for action.

# Index

- [Installation](#installation)
- [Specification](#specification)
- [Action](#action-type)
- [API](#api)
  - [action](#action)
  - [isAction](#isaction)
  - [Nil](#nil)
  - [List](#list)
  - [isList](#islist)
- [Related Libraries](#related-libraries)

# Installation

```
npm i @action-land/core
```

# Specification

1.  An `Action` consists of two properties viz. `type` and `value`.
2.  `action.type` is of type `string` or `number`.
3.  `action.value` is of type `any`. It could also be of type `Action`
4.  The object is an immutable and should never be updated.

# Action Type

An action is an object which contains two properties — `type` and `value`.

```ts
interface Action<T> {
  type: string
  value: T
}
```

# API

## action

A utility that helps in creating a new object of action type. The function is curried by default and provides type guarantee.

```ts
import {action} from '@action-land/core'

action('click', {x: 10, y: 20})

action('click')({x: 10, y: 20}) // curried version
```

## isAction

A utility function that detects if the object is of `Action` type.

```ts
import {isAction} from '@action-land/core'

isAction({}) // returns false
isAction(action('WWW', null)) // returns true
```

## Nil

A default action that represents nothingness.

```ts
import {Nil} from '@action-land/core'

function logic(a: number) {
  if (a > 10) return action('greater', a - 10)
  if (a < 10) return action('lesser', 10 - a)
  return Nil
}
```

## List

A utility function that creates an `Action` from a list of `Action[]`.

```ts
import {List} from '@action-land/core'

const list = List(action('A', 1), action('B', 2))
```

## isList

A utility function that checks if the action is of list type

```ts
import {isList} from '@action-land/core'

const list = List(action('A', 1), action('B', 2))

isList(list) //true
```

## isNil

A utility function that checks if the action is of `Nil`

```ts
import {isNil, Nil} from '@action-land/core'

isNil(Nil) // true
isNil({type: '@@NIL', value: {}}) // true
isNil({type: 'click', value: {}}) // false
```
