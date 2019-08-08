import {ComponentNext} from '@action-land/component'
import {action, Action, Nil} from '@action-land/core'
import {Smitten} from '@action-land/smitten'
import keys from 'ramda/es/keys'

declare function $<T>(a: T): T extends ComponentNext<infer P> ? P : never

// $ExpectType { count: number; }
$(ComponentNext.lift({count: 0})).iState

// $ExpectType { count: number; }
$(ComponentNext.lift({count: 0})).oState

// $ExpectType Action<number, "inc">
$(
  ComponentNext.lift({count: 0}).matchR('inc', (e: number, s) => ({
    count: s.count + 1
  }))
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

// $ExpectType Action<{ b: number; } & { a: string; }, "inc">
$(
  ComponentNext.addEnv({getDisk: (a: null): void => {}})
    .lift({count: 0})
    .matchC('inc', (a: {a: string}, s) => action('getDisk', null))
    .matchC('inc', (a: {b: number}, s) => action('getDisk', null))
).iActions

// $ExpectType { node: { count: number; }; children: { child1: { i: boolean; }; child2: { i: string; }; }; }
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

// $ExpectType { childA: ComponentNext<{ iState: number; oState: number; oView: void; iSideEffects: never; }>; }
$(
  ComponentNext.lift(0).install({
    childA: ComponentNext.lift(10)
  })
).iChildren

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

// $ExpectType ComponentNext<{ iState: undefined; oState: undefined; oView: void; iSideEffects: never; }>
ComponentNext.empty

// $ExpectType ComponentNext<{ iState: { count: number; }; oState: { count: number; }; oView: void; iSideEffects: Action<null, "getDisk"> | Action<{ data: { key: number; }; }, "writeDisk">; }>
ComponentNext.addEnv({
  getDisk: (a: null): void => {},
  writeDisk: (a: {data: {key: number}}) => {}
}).lift({count: 10})

// $ExpectType Action<number, "type">
$(ComponentNext.addEnv({
  getDisk: (a: null): void => {},
  writeDisk: (a: {data: {key: number}}) => {}
})
  .lift({count: 10})
  .matchC('type', (a: number, state, actions) =>
    actions.writeDisk({data: {key: a}})
  )).iActions
