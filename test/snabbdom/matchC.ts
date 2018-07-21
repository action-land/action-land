/**
 * Created by tushar on 26/06/18
 */

import * as assert from 'assert'
import {matchC} from '../../modules/snabbdom/src/matchC'
import {action, isNil} from 'action-type'

describe('matchC', () => {
  it('should call the matching command function', () => {
    const actual = matchC({
      add: (a: number, b: number) => action('added', a + b),
      mul: (a: number, b: number) => action('multiplied', a * b)
    })(action('add', 10), 20)
    const expected = action('added', 30)

    assert.deepEqual(actual, expected)
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
    assert.deepEqual(actual, expected)
  })
})
