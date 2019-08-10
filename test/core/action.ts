import * as assert from 'assert'
import {action, isNil, Nil} from '../../modules/core/index'
import {Action2} from '@action-land/core/src/action'
describe('action', () => {
  it('should return an action', () => {
    const actual = action('WONDER', {count: 10})
    const expected = {type: 'WONDER', value: {count: 10}}
    assert.deepEqual(actual, expected)
  })

  it('should be curried', () => {
    const actual = action('WONDER')({count: 10})
    const expected = {type: 'WONDER', value: {count: 10}}
    assert.deepEqual(actual, expected)
  })

  it('should accept type as number', () => {
    const actual = action(120)({count: 10})
    const expected = {type: 120, value: {count: 10}}
    assert.deepEqual(actual, expected)
  })

  it('should ignore Nil values', () => {
    const actual = action('WIND', Nil())
    assert.ok(isNil(actual))
  })

  describe('fold', () => {
    it('should call callback with action value at first level', () => {
      const nestedAction = Action2.of(Action2.of(10, 't2'), 't1')
      const state = {
        count: 10
      }
      const actual = nestedAction.fold(
        {
          t2: (val, state) => ({count: state.count + val})
        },
        state
      )
      const expected = {
        count: 20
      }
      assert.deepEqual(actual, expected)
    })
    it('should call callback at nth level', () => {
      const nestedAction = Action2.of(
        Action2.of(Action2.of(10, 't3'), 't2'),
        't1'
      )
      const state = {
        count: 10
      }
      const actual = nestedAction.fold(
        {
          t2: {
            t3: (val, state) => ({count: state.count + val})
          }
        },
        state
      )
      const expected = {
        count: 20
      }
      assert.deepEqual(actual, expected)
    })
  })
})
