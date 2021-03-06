import {ComponentNext} from '@action-land/component'
import {ListComponentState} from '@action-land/component/src/listComponentState'
import {action, Action, List, Nil} from '@action-land/core'
import {create, Smitten} from '@action-land/smitten'
import * as assert from 'assert'

describe('ComponentNext', () => {
  describe('lift', () => {
    it('should lift a state into a component', () => {
      const component = ComponentNext.lift({count: 0})
      assert.ok(component instanceof ComponentNext)
    })
  })

  describe('update', () => {
    it('should not update the current state', () => {
      const actual = ComponentNext.lift({count: 0})._update(
        action('inc', null),
        {count: 10}
      )
      const expected = {count: 10}

      assert.deepStrictEqual(actual, expected)
    })
  })

  describe('init', () => {
    it('should return the initial state', () => {
      const component = ComponentNext.lift({count: 0})
      const actual = component._init()
      const expected = {count: 0}
      assert.deepEqual(actual, expected)
    })
  })

  describe('matchR', () => {
    it('should match action types', () => {
      const component = ComponentNext.lift({count: 0})
        .matchR('inc', (e, s) => ({count: s.count + 1, lastAction: 'inc'}))
        .matchR('dec', (e, s) => ({count: s.count - 1, lastAction: 'dec'}))

      const actual = component._update(action('inc', null), component._init())
      const expected = {count: 1, lastAction: 'inc'}

      assert.deepEqual(actual, expected)
    })

    // This should be the responsibility of the callback passed to matchR
    it.skip('should merge with the initial state', () => {
      const component = ComponentNext.lift({count: 0}).matchR(
        'inc',
        (e, s) => ({count: s.count + 1})
      )

      const iState: any = component._init()
      const actual = component._update(action('inc', null), {
        node: {
          ...iState.node,
          color: 'red'
        },
        children: {}
      })
      const expected = {node: {count: 1, color: 'red'}, children: {}}

      assert.deepEqual(actual, expected)
    })

    it('should propagate children', () => {
      const component = ComponentNext.lift(0)
        .install({
          child: ComponentNext.lift(10).render(() => 'Hello')
        })
        .matchR('inc', (e, {node: s, children}) => ({node: s + 1, children}))
        .render(_ => _.children.child())
      const actual = component._view(create(() => {}), component._init(), {})
      const expected = 'Hello'

      assert.strictEqual(actual, expected)
    })
  })

  describe('install', () => {
    it('should perform nested initialization', () => {
      const component = ComponentNext.lift({countA: 0}).install({
        childB: ComponentNext.lift({countB: 100})
      })
      const actual = component._init()
      const expected = {
        node: {countA: 0},
        children: {childB: {countB: 100}}
      }

      assert.deepEqual(actual, expected)
    })

    it('should install actions', () => {
      const component = ComponentNext.lift({countA: 0}).install({
        childB: ComponentNext.lift({countB: 100}).matchR('inc', (e, s) => ({
          countB: s.countB + 1
        }))
      })
      const actual = component._update(
        action('childB', action('inc', null)),
        component._init()
      )
      const expected = {
        node: {countA: 0},
        children: {childB: {countB: 101}}
      }

      assert.deepEqual(actual, expected)
    })

    it('should call local matchR', () => {
      const component = ComponentNext.lift({a: 0})
        .matchR('inc', (e, s) => ({
          a: s.a + 1
        }))
        .install({
          child: ComponentNext.lift({b: 100}).matchR('inc', (e, s) => ({
            b: s.b + 1
          }))
        })

      const actual = component._update(action('inc', null), component._init())
      const expected = {
        node: {a: 1},
        children: {child: {b: 100}}
      }

      assert.deepStrictEqual(actual, expected)
    })

    it('should update child state locally', () => {
      const component = ComponentNext.lift(0)
        .install({
          child: ComponentNext.lift(10)
        })
        .matchR('inc', (e, s) => ({...s, children: {child: 1000}}))
      const actual = component._update(action('inc', null), component._init())
      const expected = {
        node: 0,
        children: {
          child: 1000
        }
      }

      assert.deepStrictEqual(actual, expected)
    })

    it('should return nested child action', () => {
      const component = ComponentNext.lift(0)
        .matchC('a', () => action('A', []))
        .install({
          child: ComponentNext.lift(1).matchC('b', (e, s) => action('c', 10))
        })
      const actual = component._command(
        action('child', action('b', null)),
        component._init()
      )
      const expected = action('child', action('c', 10))
      assert.deepStrictEqual(actual, expected)
    })

    it('should combine with nested child actions', () => {
      const component = ComponentNext.lift(0)
        .matchC('X', () => action('X', 'X'))
        .install({
          X: ComponentNext.lift(1).matchC('Y', (e, s) => action('Y', 'Y'))
        })
      const actual = component._command(
        action('X', action('Y', {})),
        component._init()
      )
      const expected = List(action('X', 'X'), action('X', action('Y', 'Y')))
      assert.deepStrictEqual(actual, expected)
    })
    it('should pass original component state to command', () => {
      const component = ComponentNext.lift({countA: 0})
        .matchC('a', (v, s) => Action.of('b', s))
        .install({
          childB: ComponentNext.lift({countB: 100})
        })
      const actual = component._command(Action.of('a', null), component._init())
      const expected = Action.of('b', {countA: 0})
      assert.deepEqual(actual, expected)
    })
  })

  describe('render', () => {
    it('should create vNodes', () => {
      const component = ComponentNext.lift(10).render(_ => [
        'Hello',
        _.state + 1
      ])
      const actual = component._view({}, component._init(), {})
      const expected = ['Hello', 11]

      assert.deepStrictEqual(actual, expected)
    })

    it('should create children views', () => {
      const component = ComponentNext.lift('Hello')
        .install({child: ComponentNext.lift('World').render(_ => _.state)})
        .render(_ => [_.state.node, _.children.child()])

      const actual = component._view(create(() => {}), component._init(), {})
      const expected = ['Hello', 'World']

      assert.deepStrictEqual(actual, expected)
    })

    it('should render with props', () => {
      const component = ComponentNext.lift('Hello')
        .install({
          child: ComponentNext.lift('World').render((_, p: string) => p)
        })
        .render((_, p: string) => [p, _.children.child('World')])

      const actual = component._view(
        create(() => {}),
        component._init(),
        'Hello'
      )
      const expected = ['Hello', 'World']

      assert.deepStrictEqual(actual, expected)
    })

    it('should emit actions', () => {
      const result: Action<unknown>[] = []
      const e = create(a => result.push(a))
      const component = ComponentNext.lift(10)
        .matchR('add', (a: number, s) => s + a)
        .render(_ => _.actions.add(100))

      component._view(e, component._init(), '')
      const expected = [action('add', 100)]

      assert.deepStrictEqual(result, expected)
    })

    it('should pass on the emitter', () => {
      const result: Action<unknown>[] = []
      const e = create(a => result.push(a))
      const component = ComponentNext.lift(10)
        .install({
          child: ComponentNext.lift(0)
            .matchR('add', (a: number, s) => s + a)

            .render(_ => _.actions.add(100))
        })
        .render(_ => _.children.child())

      component._view(e, component._init(), '')
      const expected = [action('child', action('add', 100))]

      assert.deepStrictEqual(result, expected)
    })
  })

  describe('matchC', () => {
    it('should propagate children', () => {
      const component = ComponentNext.lift(0)
        .install({
          child: ComponentNext.lift(10).render(() => 'Hello')
        })
        .matchC('inc', Nil)
        .render(_ => _.children.child())
      const actual = component._view(create(() => {}), component._init(), {})
      const expected = 'Hello'

      assert.strictEqual(actual, expected)
    })

    it('should add new action', () => {
      const result: unknown[] = []
      const component = ComponentNext.lift(0)
        .matchC('inc', Nil)
        .render(_ => _.actions.inc('Hello'))

      component._view(create(a => result.push(a)), component._init(), {})
      const expected = [action('inc', 'Hello')]

      assert.deepStrictEqual(result, expected)
    })
  })

  describe('configure', () => {
    it('should configure the initial state', () => {
      const actual = ComponentNext.lift({count: 10})
        .configure(S => ({...S, color: 'red'}))
        ._init()
      const expected = {count: 10, color: 'red'}

      assert.deepStrictEqual(actual, expected)
    })
  })

  describe('empty', () => {
    it('should give initial state as undefined', () => {
      const actual = ComponentNext.empty._init()
      const expected = undefined
      assert.strictEqual(actual, expected)
    })
  })

  describe('from', () => {
    const component = ComponentNext.from(
      {
        init: (a: string, b: number) => 10,
        update: (a: Action<unknown>, b: number) => 5,
        command: (a: Action<unknown>, b: number) => action('c', 10),
        view: (e: Smitten, m: number, s: Date) => {
          return ['Hello']
        }
      },
      'hello',
      10
    )
    it('should call init of old version of component', () => {
      const actual = component._init()
      const expected = 10
      assert.deepEqual(actual, expected)
    })
    it('should call update of old version of component', () => {
      const actual = component._update(action('a', 10), 10)
      const expected = 5
      assert.deepEqual(actual, expected)
    })
    it('should call command of old version of component', () => {
      const actual = component._command(action('a', 10), 10)
      const expected = action('c', 10)
      assert.deepEqual(actual, expected)
    })
    it('should call view of old version of component', () => {
      const actual = component._view(create(() => {}), 10, new Date())
      const expected = ['Hello']
      assert.deepEqual(actual, expected)
    })
  })
})
