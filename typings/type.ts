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

// $ExpectType { node: { count: number; }; children: { child1: { i: boolean; }; child2: { i: string; }; }; }
$(
  ComponentNext.lift({count: 0}).forward({
    child1: ComponentNext.lift({i: true}),
    child2: ComponentNext.lift({i: 'Hi'})
  })
).oState

// $ExpectType { node: { count: number; }; children: { child1: { i: boolean; }; child2: { i: string; }; }; }
$(
  ComponentNext.lift({count: 0}).forward({
    child1: ComponentNext.lift({i: true}),
    child2: ComponentNext.lift({i: 'Hi'})
  })
).iState

// $ExpectType Action<unknown, "X"> | Action<Action<unknown, "A">, "childA"> | Action<Action<unknown, "B">, "childB">
$(
  ComponentNext.lift({count: 0})
    .matchR('X', (e, s) => s)
    .forward({
      childA: ComponentNext.lift({i: true}).matchR('A', (e, s) => s),
      childB: ComponentNext.lift({i: true}).matchR('B', (e, s) => s)
    })
).iActions

// $ExpectType { childA: ComponentNext<{ iState: number; oState: number; oView: void; }>; }
$(
  ComponentNext.lift(0).forward({
    childA: ComponentNext.lift(10)
  })
).iChildren

// $ExpectType Action<null, "X"> | Action<Action<null, "A">, "childA">
$(
  ComponentNext.lift({count: 0})
    .matchC('X', (e, s) => action('X', null))
    .forward({
      childA: ComponentNext.lift({i: true}).matchC('A', (e, s) =>
        action('A', null)
      )
    })
).oActions

// $ExpectType string
$(ComponentNext.lift({count: 0}).render(() => 'Hello')).oView

// $ExpectType { s: { count: number; }; p: boolean; }
$(ComponentNext.lift({count: 0}).render((_, p: boolean) => ({s: _.state, p})))
  .oView

// $ExpectType { inc: (e: number) => unknown; }
$(
  ComponentNext.lift(0)
    .matchR('inc', (e: number, s) => s + e)
    .render((_, p: boolean) => _.actions)
).oView

// $ExpectType {}
$(ComponentNext.lift(0).render((_, p: boolean) => _.actions)).oView

// $ExpectType { childA: (p: Date) => string[]; }
$(
  ComponentNext.lift(0)
    .forward({
      childA: ComponentNext.lift(10).render((_, p: Date) => ['DONE'])
    })
    .render((_, p: boolean) => _.children)
).oView

// $ExpectType { childA: () => string[]; }
$(
  ComponentNext.lift(0)
    .forward({
      childA: ComponentNext.lift(10).render(() => ['DONE'])
    })
    .render((_, p: boolean) => _.children)
).oView
