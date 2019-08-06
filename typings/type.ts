import {ComponentNext} from '@action-land/component'
import {action, Action, Nil} from '@action-land/core'
import {Smitten} from '@action-land/smitten'

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

// $ExpectType Action<{ url: string; }, "HTTP"> | Action<{ data: string; }, "Write">
$(
  ComponentNext.lift({count: 0})
    .matchC('inc', (e, s) => action('HTTP', {url: 'abc.com'}))
    .matchC('dec', (e, s) => action('Write', {data: 'abc'}))
).oActions

// $ExpectType Action<{ b: number; } & { a: string; }, "inc">
$(
  ComponentNext.lift({count: 0})
    .matchC('inc', (a: {a: string}, s) => Nil())
    .matchC('inc', (a: {b: number}, s) => Nil())
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

// $ExpectType { childA: ComponentNext<{ iState: number; oState: number; oView: void; }>; }
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

// $ExpectType ComponentNext<{ iState: undefined; oState: undefined; oView: void; }>
ComponentNext.empty

// $ExpectType { newAction: Action<number, "oAction">; newState: { color: string; } | { font: string; color: string; }; }
ComponentNext.lift({color: 'blue'})
  .matchR('mount', (value: string, state) => ({
    ...state,
    font: value
  }))
  .matchC('mount', (value: string, state) => action('oAction', 10))
  .eval(action('mount', '10px'), {color: 'blue'})

// const childComponent2 = ComponentNext.lift({c: 100})
//   .matchR('inc', (e, s) => ({
//     c: s.c + 1
//   }))
//   .matchC('inc', (e, s) => action('incIO', s))
//   .render((_, p) => _.state.c)

// const childComponent1 = ComponentNext.lift({b: 100})
//   .matchR('inc', (e, s) => ({
//     b: s.b + 1
//   }))
//   .matchC('inc', (e, s) => action('incIO', s))
//   .install({
//     child: childComponent2
//   })
//   .render((_, p) => _.state.node.b + _.children.child())

// // $ExpectType ComponentNext<{ iState: undefined; oState: undefined; oView: void; }>
// $(
//   ComponentNext.lift({a: 0})
//     .matchR('inc', (e, s) => ({
//       a: s.a + 1
//     }))
//     .install({
//       child: childComponent1
//     })
// ).oActions

// type a = Action<
//   Action<{b: number}, 'incIO'> | Action<Action<{c: number}, 'incIO'>, 'child'>,
//   'child'
// >

// $ExpectType { newAction: Action<number, "oAction">; newState: { color: string; } | { font: string; color: string; }; }
const a = ComponentNext.addEnv({
  getDisk: (a: null): void => {},
  writeDisk: (a: {data: {key: number}}) => {}
})
  .lift({count: 10})
  .matchR('inc', (a: null, b) => ({count: b}))
