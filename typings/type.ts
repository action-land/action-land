import {ComponentNext, ComponentProps} from '@action-land/component'

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
