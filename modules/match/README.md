# @action-land/match

A switch case for actions.

# Installation

```
npm i @action-land/match
```

# Usage

Exposes a single `match()` function that —

1.  Accepts two arguments — `default` and `spec`.
2.  `default` is a function that accepts the `action` and can return anything.
3.  `spec` is an object where key is `action.type` and value is a function.
4.  On a successful match of `action.type` the corresponding function is called with the `action.value`.  

```ts
import {action} from '@action-land/core'
import {match} from '@action-land/match'

const fn = match(i => i, {
  inc: i => i + 1,
  dec: i => i - 1
})

fn(action('inc', 10)) // returns 11
```
