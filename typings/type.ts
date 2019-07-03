import {ComponentNext} from '@action-land/component'
import {action} from '@action-land/core'

// $ExpectType ComponentNext<{ count: number; }, { count: number; }, never, never>
ComponentNext.lift({count: 0})

// $ExpectType ComponentNext<{ count: number; }, { count: number; }, Action<unknown, "inc">, never>
ComponentNext.lift({count: 0}).matchR('inc', (e, s) => ({count: s.count + 1}))

// $ExpectType ComponentNext<{ count: number; }, { count: number; } | { count: number; lastAction: string; }, Action<unknown, "inc">, never>
ComponentNext.lift({count: 0}).matchR('inc', (e, s) => ({
  count: s.count + 1,
  lastAction: 'inc'
}))

// $ExpectType ComponentNext<{ count: number; }, { count: number; }, never, Action<number, "GQL">>
ComponentNext.lift({count: 0}).matchC('inc', (e, s) => action('GQL', s.count))
