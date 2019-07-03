import {action} from '@action-land/core'
import * as assert from 'assert'
import {ComponentNext} from '../../modules/component/src/componentNext'

describe('ComponentNext', () => {
  describe('lift', () => {
    it('should lift a state into a component', () => {
      const component = ComponentNext.lift({count: 0})
      assert.ok(component instanceof ComponentNext)
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
  })
})
