/**
 * Created by tushar on 26/06/18
 */

import {action} from '@action-land/core'
import * as assert from 'assert'
import {matchR} from '../../modules/tarz/src/matchR'

describe('matchR', () => {
  it('should call the matching update function', () => {
    const actual = matchR({
      add: (a: number, b: number) => a + b,
      mul: (a: number, b: number) => a * b,
    })(action('add', 10), 20)
    const expected = 30

    assert.strictEqual(actual, expected)
  })

  it('should return original state', () => {
    const actual = matchR({
      add: (a: number, b: number) => a + b,
      mul: (a: number, b: number) => a * b,
    })(action('div', 10), 20)
    const expected = 20

    assert.strictEqual(actual, expected)
  })

  it('should be curried', () => {
    const actual = matchR({
      add: (a: number, b: number) => a + b,
      mul: (a: number, b: number) => a * b,
    })(action('add', 10))(20)
    const expected = 30
    assert.strictEqual(actual, expected)
  })

  it('should skip non-action args', () => {
    const actual = matchR({})(10, 200)
    assert.strictEqual(actual, 200)
  })
})
