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

  describe('memoizeWith', () => {
    it('should not memoize component by default', () => {
      const component = ComponentNext.lift({count: 1}).render(_ =>
        Math.random()
      )

      const a = component._view({}, component._init(), null)
      const b = component._view({}, component._init(), null)

      assert.notEqual(a, b)
    })
    it('should memoize the view', () => {
      const component = ComponentNext.lift(0)
        .render(_ => Math.random())
        .memoizeWith(() => true)
      const a = component._view({}, component._init(), null)
      const b = component._view({}, component._init(), null)

      assert.strictEqual(a, b)
    })

    it('should compute view on first call', () => {
      const component = ComponentNext.lift(0)
        .render(_ => [_.state])
        .memoizeWith(() => true)
      const actual = component._view({}, component._init(), null)
      const expected = [0]

      assert.deepStrictEqual(actual, expected)
    })

    it('should pass pervious state/props to fn', () => {
      const args = new Array<any>()
      const component = ComponentNext.lift(0)
        .render(_ => [_.state])
        .memoizeWith((...t) => {
          args.push(t)
          return false
        })

      component._view({}, 100, 'A')
      component._view({}, 200, 'B')

      assert.deepStrictEqual(args, [[200, 'B', 100, 'A']])
    })

    it('should intersect multiple memoizeWith', () => {
      const component = ComponentNext.lift(0)
        .render(_ => [_.state])
        .memoizeWith((s1, p1, s2, p2) => s1 === s2)
        .memoizeWith((s1, p1, s2, p2) => p1 === p2)

      const a = component._view({}, 100, 'A')
      const b = component._view({}, 100, 'A')

      assert.strictEqual(a, b)
    })

    it('should combine multiple memoizeWith', () => {
      const component = ComponentNext.lift(0)
        .render(_ => Math.random())
        .memoizeWith(() => true)
        .memoizeWith(() => false)

      const a = component._view({}, 100, 'A')
      const b = component._view({}, 100, 'A')

      assert.notStrictEqual(a, b)
    })
  })
  describe('toList', () => {
    it('should do add empty item object and empty key array in state on init', () => {
      const baseComponent = ComponentNext.lift({a: ''})
      const listComponent = baseComponent.toList(prop => prop)
      const actual = listComponent._init()
      const expected = ListComponentState.of(baseComponent._init)
      assert.deepEqual(actual, expected)
    })
    it('should add key in action hierarchy based on keying function and props', () => {
      const listComponent = ComponentNext.lift({a: ''})
        .matchR('action1', (value, state) => ({...state, b: ''}))
        .matchC('action2', (value: string, state) => action('output', value))
        .render((_, p: {propVal: string}) => {
          return _.actions.action1(null)
        })
        .toList(prop => prop.propVal)
      let emittedAction: any
      listComponent._view(
        create(a => {
          emittedAction = a
          return a
        }),
        listComponent._init(),
        {propVal: 'ab'}
      )
      assert.deepEqual(emittedAction, action('action1', null).lift('ab'))
    })
    it('should add respective state on accepting lifted action for first time', () => {
      const component = ComponentNext.lift({count: 10}).matchR(
        'action1',
        (value: number, state) => ({
          count: state.count + value
        })
      )
      const listComponent = component.toList(
        (prop: {propVal: string}) => prop.propVal
      )
      const actual = listComponent
        ._update(action('action1', 10).lift('ab'), listComponent._init())
        .get('ab')
        .getRightOrElse({count: 10})
      const expected = {count: 20}
      assert.deepEqual(actual, expected)
    })
    it('should update respective state on accepting lifted action', () => {
      const component = ComponentNext.lift({count: 10}).matchR(
        'action1',
        (value: number, state) => ({
          count: state.count + value
        })
      )
      const listComponent = component.toList(
        (prop: {propVal: string}) => prop.propVal
      )
      const actual = listComponent
        ._update(
          action('action1', 10).lift('ab'),
          ListComponentState.of(listComponent._init).set('ab', {
            count: 20
          })
        )
        .get('ab')
        .getRightOrElse({count: 10})
      const expected = {count: 30}
      assert.deepEqual(actual, expected)
    })
    it('should return lifted action respective state on accepting lifted action', () => {
      const component = ComponentNext.lift({a: ''}).matchC(
        'action2',
        (value: string, state) => action('output', value)
      )
      const listComponent = component.toList(
        (prop: {propVal: string}) => prop.propVal
      )
      const actual = listComponent._command(
        action('action2', 'hello').lift('ab'),
        listComponent._init()
      )
      const expected = Action.of('output', 'hello').lift('ab')
      assert.deepEqual(actual, expected)
    })
    /**
     * @todo: fix this test
     * */
    it.skip('should be able to call render on list component', () => {
      const component = ComponentNext.lift({a: ''}).matchC(
        'action2',
        (value: string, state) => action('output', value)
      )
      const listComponent = component
        .toList((prop: {propVal: string}) => prop.propVal)
        .render((_, prop: string) => _.actions.s(action('action2', 'hello')))
      assert.ifError(listComponent._view(() => {}, listComponent._init(), 'a'))
    })
  })
})
