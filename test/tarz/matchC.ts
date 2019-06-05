/**
 * Created by tushar on 26/06/18
 */

import {action, isNil} from '@action-land/core'
import * as assert from 'assert'

import {matchC} from '../../modules/tarz/src/matchC'

// tslint:disable: no-magic-numbers

describe('matchC', () => {
  it('should call the matching command function', () => {
    const actual = matchC({
      add: (a: number, b: number) => action('added', a + b),
      mul: (a: number, b: number) => action('multiplied', a * b)
    })(action('add', 10), 20)
    const expected = action('added', 30)

    assert.deepStrictEqual(actual, expected)
  })

  it('should return Nil', () => {
    const actual = matchC({
      add: (a: number, b: number) => action('added', a + b),
      mul: (a: number, b: number) => action('multiplied', a * b)
    })(action('div', 10), 20)

    assert.ok(isNil(actual))
  })

  it('should be curried', () => {
    const actual = matchC({
      add: (a: number, b: number) => action('added', a + b),
      mul: (a: number, b: number) => action('multiplied', a * b)
    })(action('add', 10))(20)
    const expected = action('added', 30)
    assert.deepStrictEqual(actual, expected)
  })

  it('should skip non-action type values', () => {
    const actual = matchC({})(1000, 20)
    assert.ok(isNil(actual))
  })
})
