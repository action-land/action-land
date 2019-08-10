import * as assert from 'assert'
import {action, Action, isNil, Nil} from '../../modules/core/index'

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
      const nestedAction = Action.of(Action.of(10, 't2'), 't1')
      const state = {
        count: 10
      }
      const actual = nestedAction.fold(
        {
          t1: {
            t2: (val, state) => ({count: state.count + val})
          }
        },
        state
      )
      const expected = {
        count: 20
      }
      assert.deepEqual(actual, expected)
    })
    it('should call callback at nth level', () => {
      const nestedAction = Action.of(Action.of(Action.of(10, 't3'), 't2'), 't1')
      const state = {
        count: 10
      }
      const actual = nestedAction.fold(
        {
          t1: {
            t2: {
              t3: (val, state) => ({count: state.count + val})
            }
          }
        },
        state
      )
      const expected = {
        count: 20
      }
      assert.deepEqual(actual, expected)
    })
    it('should call fold in nested fashion', () => {
      const nestedAction = Action.of(Action.of(Action.of(10, 't3'), 't2'), 't1')
      const state = {
        count: 10
      }
      const actual = nestedAction.fold(
        {
          t1: (val, state) => {
            return val.fold(
              {
                t2: {
                  t3: (val, state) => ({count: state.count + val})
                }
              },
              state
            )
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
