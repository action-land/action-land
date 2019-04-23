import {action} from '@action-land/core'
import * as assert from 'assert'
import {describe, it} from 'mocha'

import {match} from '../../modules/match/index'

describe('match', () => {
  it('should match based on action.type', () => {
    const actual = match((i: number) => i, {
      greet: (i: string): string => `hi ${i}`,
      inc: (i: number): number => i + 1
    })(action('inc', 10))
    const expected = 11
    assert.strictEqual(actual, expected)
  })

  it('should call default with action if nothing matches', () => {
    const actual = match(i => i.value, {
      dec: (i: number): number => i - 1,
      inc: (i: number): number => i + 1
    })(action('otherwise', 10))
    const expected = 10
    assert.strictEqual(actual, expected)
  })
  it('should be curried', () => {
    const actual = match(i => i.value)({
      dec: (i: number): number => i - 1,
      inc: (i: number): number => i + 1
    })(action('otherwise', 10))
    const expected = 10
    assert.strictEqual(actual, expected)
  })

  it('should handle non-action types', () => {
    const actual = match(() => 1000, {
      dec: (i: number): number => i - 1,
      inc: (i: number): number => i + 1
    })(null)
    const expected = 1000
    assert.strictEqual(actual, expected)
  })
})
