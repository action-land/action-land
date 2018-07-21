# @action-land/match

A switch case for actions.

# Usage

Exposes a single `match()` function that —

1.  Accepts two arguments — `default` and `spec`.
2.  `default` is a function that accepts the `action.value` and can return anything.
3.  `spec` is an object where key is `action.type` and value is a function.

```ts
import {action} from '@action-land/core'
import {match} from '@action-land/match'

const fn = match(i => i, {
  inc: i => i + 1,
  dec: i => i - 1
})

fn(action('inc', 10)) // returns 11
```
