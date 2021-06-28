import {action} from '@action-land/core'
import * as assert from 'assert'
import {match} from '../../modules/match/index'

describe('match', () => {
  it('should match based on action.type', () => {
    const actual = match((i: number) => i, {
      inc: (i: number) => i + 1,
      greet: (i: string) => 'hi ' + i,
    })(action('inc', 10))
    const expected = 11
    assert.strictEqual(actual, expected)
  })

  it('should call default with action if nothing matches', () => {
    const actual = match((i) => i.value, {
      inc: (i: number) => i + 1,
      dec: (i: number) => i - 1,
    })(action('otherwise', 10))
    const expected = 10
    assert.strictEqual(actual, expected)
  })
  it('should be curried', () => {
    const actual = match((i) => i.value)({
      inc: (i: number) => i + 1,
      dec: (i: number) => i - 1,
    })(action('otherwise', 10))
    const expected = 10
    assert.strictEqual(actual, expected)
  })

  it('should handle non-action types', () => {
    const actual = match(() => 1000, {
      inc: (i: number) => i + 1,
      dec: (i: number) => i - 1,
    })(null)
    const expected = 1000
    assert.strictEqual(actual, expected)
  })
})
