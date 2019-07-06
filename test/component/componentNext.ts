import {action} from '@action-land/core'
import * as assert from 'assert'
import {ComponentNext} from '../../modules/component/src/componentNext'

describe('ComponentNext', () => {
  describe('lift', () => {
    it('should lift a state into a component', () => {
      const component = ComponentNext.lift({count: 0})
      assert.ok(component instanceof ComponentNext)
    })

    it('should update on the passed state', () => {
      const actual = ComponentNext.lift({count: 0})._update(
        action('inc', null),
        {count: 10, color: 'red'}
      )
      const expected = {count: 10, color: 'red'}

      assert.deepStrictEqual(actual, expected)
    })
  })

  describe('init', () => {
    it('should return the initial state', () => {
      const component = ComponentNext.lift({count: 0})
        .matchR('inc', (e, s) => ({count: s.count + 1, lastAction: 'inc'}))
        .matchR('dec', (e, s) => ({count: s.count - 1, lastAction: 'dec'}))
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

    it('should merge with the initial state', () => {
      const component = ComponentNext.lift({count: 0}).matchR(
        'inc',
        (e, s) => ({count: s.count + 1})
      )

      const actual = component._update(action('inc', null), {
        ...component._init(),
        color: 'red'
      })
      const expected = {count: 1, color: 'red'}

      assert.deepEqual(actual, expected)
    })
  })

  describe('forward', () => {
    it('should perform nested initialization', () => {
      const component = ComponentNext.lift({countA: 0}).forward({
        childB: ComponentNext.lift({countB: 100})
      })
      const actual = component._init()
      const expected = {node: {countA: 0}, children: {childB: {countB: 100}}}

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
      const expected = {node: {countA: 0}, children: {childB: {countB: 101}}}

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
      const expected = {node: {a: 1}, children: {child: {b: 100}}}

      assert.deepStrictEqual(actual, expected)
    })
  })
})
