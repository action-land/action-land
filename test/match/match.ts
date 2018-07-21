import {describe, it} from 'mocha'
import {match} from '../../modules/match/index'
import {action} from 'action-type'
import * as assert from 'assert'

describe('match', () => {
  it('should match based on action.type', () => {
    const actual = match((i: number) => i, {
      inc: (i: number) => i + 1,
      greet: (i: string) => 'hi ' + i
    })(action('inc', 10))
    const expected = 11
    assert.strictEqual(actual, expected)
  })

  it('should call default if nothing matches', () => {
    const actual = match((i: number) => i, {
      inc: (i: number) => i + 1,
      dec: (i: number) => i - 1
    })(action('otherwise', 10))
    const expected = 10
    assert.strictEqual(actual, expected)
  })
  it('should be curried', () => {
    const actual = match((i: number) => i)({
      inc: (i: number) => i + 1,
      dec: (i: number) => i - 1
    })(action('otherwise', 10))
    const expected = 10
    assert.strictEqual(actual, expected)
  })
})
