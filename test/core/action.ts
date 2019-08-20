import * as assert from 'assert'
import {Action, action, isNil, Nil} from '../../modules/core/index'

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
    it('should fold over non-nested actions', () => {
      const actual = Action.fold(100, action('A', 50), (s, a) => s + a.value)
      const expected = 150

      assert.strictEqual(actual, expected)
    })

    it('should fold over nested actions', () => {
      const actual = Action.fold(
        100,
        action('A', 50).lift('B'),
        (s, a) => s + a.value.value
      )
      const expected = 150

      assert.strictEqual(actual, expected)
    })

    it('should fold over any level of nested actions', () => {
      const actual = Action.fold(
        100,
        action('A', 50)
          .lift('B')
          .lift('C')
          .lift('D'),
        (s, a) => s + a.value.value.value.value
      )
      const expected = 150

      assert.strictEqual(actual, expected)
    })

    it('should fold using a nested spec', () => {
      const actual = Action.fold(
        {count: 100},
        action('A', 50)
          .lift('B')
          .lift('C')
          .lift('D')
          .lift('E')
          .lift('F'),

        {F: {E: {D: {C: {B: {A: (s, a) => ({count: s.count + a})}}}}}}
      )
      const expected = {count: 150}

      assert.deepEqual(actual, expected)
    })

    it('should fold nil', () => {
      const actual = Action.fold(100, Action.nil(), (s, a) => s + 1)
      const expected = 101

      assert.strictEqual(actual, expected)
    })
  })
})
