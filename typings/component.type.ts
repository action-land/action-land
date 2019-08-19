import {ComponentNext} from '@action-land/component'
import {action, Action, Nil} from '@action-land/core'
import {Smitten} from '@action-land/smitten'

declare function $<T>(a: T): T extends ComponentNext<infer P> ? P : never

// $ExpectType { count: number; }
$(ComponentNext.lift({count: 0})).iState

// $ExpectType { iState: { count: number; }; oView: void; }
$(ComponentNext.lift({count: 0}))

// $ExpectType Action<number, "inc">
$(
  ComponentNext.lift({count: 0}).matchR('inc', (e: number, s) => ({
    count: s.count + 1
  }))
).iActions

// $ExpectType { count: number; action: string; }
$(
  ComponentNext.lift({count: 0}).matchR('inc', (e, s) => ({
    count: s.count + 1,
    action: 'inc'
  }))
).oState

// iAction should be union of action types if action type is repeated
// $ExpectType Action<number, "dec"> | Action<string, "inc">
$(
  ComponentNext.lift({count: 0})
    .matchR('dec', (e: number, s) => s)
    .matchR('inc', (e: string, s) => s)
    .matchR('inc', (e, s) => s)
).iActions

// Should infer value types in callback of match
// $ExpectType { count: number; } | { value: string; count: number; }
$(
  ComponentNext.lift({count: 0})
    .matchR('inc', (e: string, s) => s)
    .matchR('inc', (e, s) => ({
      ...s,
      value: e
    }))
).oState

// $ExpectType Action<{ url: string; }, "HTTP"> | Action<{ data: string; }, "Write">
$(
  ComponentNext.lift({count: 0})
    .matchC('inc', (e, s) => action('HTTP', {url: 'abc.com'}))
    .matchC('dec', (e, s) => action('Write', {data: 'abc'}))
).oActions

// iAction should be union of action types if action type is repeated
// $ExpectType Action<number, "dec"> | Action<string, "inc">
$(
  ComponentNext.lift({count: 0})
    .matchC('dec', (e: number, s) => Nil())
    .matchC('inc', (e: string, s) => Nil())
    .matchC('inc', (e, s) => action('output', e))
).iActions

// Should infer value types in callback of match
// $ExpectType Action<{}, string | number> | Action<string, "output">
$(
  ComponentNext.lift({count: 0})
    .matchC('dec', (e: number, s) => Nil())
    .matchC('inc', (e: string, s) => Nil())
    .matchC('inc', (e, s) => action('output', e))
).oActions

// $ExpectType { node: never; children: { child1: never; child2: never; }; }
$(
  ComponentNext.lift({count: 0}).install({
    child1: ComponentNext.lift({i: true}),
    child2: ComponentNext.lift({i: 'Hi'})
  })
).oState

// $ExpectType { node: { count: number; }; children: { child1: { i: boolean; }; child2: { i: string; }; }; }
$(
  ComponentNext.lift({count: 0}).install({
    child1: ComponentNext.lift({i: true}),
    child2: ComponentNext.lift({i: 'Hi'})
  })
).iState

// $ExpectType Action<unknown, "X"> | Action<Action<unknown, "A">, "childA"> | Action<Action<unknown, "B">, "childB">
$(
  ComponentNext.lift({count: 0})
    .matchR('X', (e, s) => s)
    .install({
      childA: ComponentNext.lift({i: true}).matchR('A', (e, s) => s),
      childB: ComponentNext.lift({i: true}).matchR('B', (e, s) => s)
    })
).iActions

// $ExpectType { childA: ComponentNext<{ iState: number; oView: void; }>; }
$(
  ComponentNext.lift(0).install({
    childA: ComponentNext.lift(10)
  })
).iChildren

// $ExpectType Action<null, "X"> | Action<Action<null, "A">, "childA">
$(
  ComponentNext.lift({count: 0})
    .matchC('X', (e, s) => action('X', null))
    .install({
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
    .install({
      childA: ComponentNext.lift(10).render((_, p: Date) => ['DONE'])
    })
    .render((_, p: boolean) => _.children)
).oView

// $ExpectType { childA: () => string[]; }
$(
  ComponentNext.lift(0)
    .install({
      childA: ComponentNext.lift(10).render(() => ['DONE'])
    })
    .render((_, p: boolean) => _.children)
).oView

// $ExpectType (e: string) => unknown
$(
  ComponentNext.lift(0)
    .matchR('inc', (e: string, s) => s)
    .matchR('dec', (e: number, s) => s)
    .render((_, p: boolean) => _.actions.inc)
).oView

// $ExpectType { color: string; count: number; }
$(ComponentNext.lift({count: 10}).configure(s => ({...s, color: 'red'}))).iState

// $ExpectType ComponentNext<{ iState: number; oState: number; oView: string[]; iProps: Date; }>
ComponentNext.from(
  {
    init: (a: string, b: number) => 10,
    update: (a: Action<unknown>, b: number) => b,
    command: (a: Action<unknown>, b: number) => Nil(),
    view: (e: Smitten, m: number, s: Date) => {
      return ['Hello']
    }
  },
  'hello',
  10
)

// $ExpectType ComponentNext<{ iState: undefined; oView: void; }>
ComponentNext.empty

// $ExpectType { b: string; a: string; } | { c: string; a: string; }
$(
  ComponentNext.lift({a: ''})
    .matchR('action1', (value, state) => ({...state, b: ''}))
    .matchR('action2', (value, state) => ({...state, c: ''}))
).oState

// $ExpectType { a: string; } | { b: string; a: string; } | { c: string; a: string; }
$(
  ComponentNext.lift({a: ''})
    .matchR('action1', (value, state) => ({...state, b: ''}))
    .matchR('action2', (value, state) => ({...state, c: ''}))
    .render(_ => _.state)
).oView

// $ExpectType { a: string; }
$(ComponentNext.lift({a: ''}).render(_ => _.state)).oView
