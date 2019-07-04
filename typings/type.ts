import {ComponentNext, ComponentProps} from '@action-land/component'
import {action} from '@action-land/core'

declare function $<T>(a: T): T extends ComponentNext<infer P> ? P : never

// $ExpectType { count: number; }
$(ComponentNext.lift({count: 0})).iState

// $ExpectType { count: number; }
$(ComponentNext.lift({count: 0})).oState

// $ExpectType Action<unknown, "inc">
$(
  ComponentNext.lift({count: 0}).matchR('inc', (e, s) => ({count: s.count + 1}))
).iActions

// $ExpectType { count: number; } | { count: number; action: string; }
$(
  ComponentNext.lift({count: 0}).matchR('inc', (e, s) => ({
    count: s.count + 1,
    action: 'inc'
  }))
).oState

// $ExpectType Action<{ b: number; } & { a: string; }, "inc">
$(
  ComponentNext.lift({count: 0})
    .matchR('inc', (e: {a: string}, s) => s)
    .matchR('inc', (e: {b: number}, s) => s)
).iActions

// $ExpectType Action<{ url: string; }, "HTTP"> | Action<{ data: string; }, "Write">
$(
  ComponentNext.lift({count: 0})
    .matchC('inc', (e, s) => action('HTTP', {url: 'abc.com'}))
    .matchC('dec', (e, s) => action('Write', {data: 'abc'}))
).oActions
