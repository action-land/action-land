# Match Action [![Build Status](https://travis-ci.com/tusharmath/match-action.svg?branch=master)](https://travis-ci.com/tusharmath/match-action)

A switch case for actions.

# Usage

Exposes a single `match()` function that —

1.  Accepts two arguments — `default` and `spec`.
2.  `default` is a function that accepts the `action.value` and can return anything.
3.  `spec` is an object where key is `action.type` and value is a function.

```ts
import {action} from 'action-types'
import {match} from 'match-action'

const fn = match(i => i, {
  inc: i => i + 1,
  dec: i => i - 1
})

fn(action('inc', 10)) // returns 11
```
