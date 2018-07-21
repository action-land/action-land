/**
 * Created by tushar on 26/06/18
 */

import * as assert from 'assert'
import {matchR} from '../../modules/tarz/src/matchR'
import {action} from '@action-land/core'

describe('matchR', () => {
  it('should call the matching update function', () => {
    const actual = matchR({
      add: (a: number, b: number) => a + b,
      mul: (a: number, b: number) => a * b
    })(action('add', 10), 20)
    const expected = 30

    assert.strictEqual(actual, expected)
  })

  it('should return original state', () => {
    const actual = matchR({
      add: (a: number, b: number) => a + b,
      mul: (a: number, b: number) => a * b
    })(action('div', 10), 20)
    const expected = 20

    assert.strictEqual(actual, expected)
  })

  it('should be curried', () => {
    const actual = matchR({
      add: (a: number, b: number) => a + b,
      mul: (a: number, b: number) => a * b
    })(action('add', 10))(20)
    const expected = 30
    assert.strictEqual(actual, expected)
  })
})
