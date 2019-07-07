import {action, Action} from '@action-land/core'
import {create} from '@action-land/smitten'
import * as assert from 'assert'
import {ComponentNext} from '../../modules/component/src/componentNext'

describe('ComponentNext', () => {
  describe('lift', () => {
    it('should lift a state into a component', () => {
      const component = ComponentNext.lift({count: 0})
      assert.ok(component instanceof ComponentNext)
    })
  })

  describe('update', () => {
    it('should update on the passed state', () => {
      const actual = ComponentNext.lift({count: 0})._update(
        action('inc', null),
        {node: {count: 10, color: 'red'}, children: {}}
      )
      const expected = {node: {count: 10, color: 'red'}, children: {}}

      assert.deepStrictEqual(actual, expected)
    })
  })

  describe('init', () => {
    it('should return the initial state', () => {
      const component = ComponentNext.lift({count: 0})
      const actual = component._init()
      const expected = {node: {count: 0}, children: {}}
      assert.deepEqual(actual, expected)
    })
  })

  describe('matchR', () => {
    it('should match action types', () => {
      const component = ComponentNext.lift({count: 0})
        .matchR('inc', (e, s) => ({count: s.count + 1, lastAction: 'inc'}))
        .matchR('dec', (e, s) => ({count: s.count - 1, lastAction: 'dec'}))

      const actual = component._update(action('inc', null), component._init())
      const expected = {node: {count: 1, lastAction: 'inc'}, children: {}}

      assert.deepEqual(actual, expected)
    })

    it('should merge with the initial state', () => {
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
  })

  describe('forward', () => {
    it('should perform nested initialization', () => {
      const component = ComponentNext.lift({countA: 0}).forward({
        childB: ComponentNext.lift({countB: 100})
      })
      const actual = component._init()
      const expected = {
        node: {countA: 0},
        children: {childB: {node: {countB: 100}, children: {}}}
      }

      assert.deepEqual(actual, expected)
    })

    it('should forward actions', () => {
      const component = ComponentNext.lift({countA: 0}).forward({
        childB: ComponentNext.lift({countB: 100}).matchR('inc', (e, s) => ({
          ...s,
          countB: s.countB + 1
        }))
      })
      const actual = component._update(
        action('childB', action('inc', null)),
        component._init()
      )
      const expected = {
        node: {countA: 0},
        children: {childB: {node: {countB: 101}, children: {}}}
      }

      assert.deepEqual(actual, expected)
    })

    it('should not forward if the action does not match', () => {
      const component = ComponentNext.lift({a: 0})
        .matchR('inc', (e, s) => ({
          a: s.a + 1
        }))
        .forward({
          child: ComponentNext.lift({b: 100}).matchR('inc', (e, s) => ({
            b: s.b + 1
          }))
        })

      const actual = component._update(action('inc', null), component._init())
      const expected = {
        node: {a: 1},
        children: {child: {node: {b: 100}, children: {}}}
      }

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
        .forward({child: ComponentNext.lift('World').render(_ => _.state)})
        .render(_ => [_.state, _.children.child()])

      const actual = component._view(create(() => {}), component._init(), {})
      const expected = ['Hello', 'World']

      assert.deepStrictEqual(actual, expected)
    })

    it('should render with props', () => {
      const component = ComponentNext.lift('Hello')
        .forward({
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
        .forward({
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
})
