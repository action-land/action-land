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
      const actual = action('A', 50).fold(100, (s, a) => s + a.value)
      const expected = 150

      assert.strictEqual(actual, expected)
    })

    it('should fold over nested actions', () => {
      const actual = action('A', 50)
        .lift('B')
        .fold(100, (s, a) => s + a.value.value)
      const expected = 150

      assert.strictEqual(actual, expected)
    })

    it('should fold over any level of nested actions', () => {
      const actual = action('A', 50)
        .lift('B')
        .lift('C')
        .lift('D')
        .fold(100, (s, a) => s + a.value.value.value.value)
      const expected = 150

      assert.strictEqual(actual, expected)
    })

    it('should fold using a nested spec', () => {
      const actual = action('A', 50)
        .lift('B')
        .lift('C')
        .lift('D')
        .lift('E')
        .lift('F')
        .fold(100, {E: {D: {C: {B: {A: (s, a) => s + a.value}}}}})
      const expected = 150

      assert.strictEqual(actual, expected)
    })

    it('should fold nil', () => {
      const actual = Action.nil().fold(10, (s, a) => s + 1)
      const expected = 11

      assert.strictEqual(actual, expected)
    })
  })
})
