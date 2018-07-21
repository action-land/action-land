/**
 * Created by tushar on 26/06/18
 */

import * as assert from 'assert'
import {concatC} from '../../modules/snabbdom/src/concatC'
import {curry2} from 'ts-curry'
import {zeroC} from '../../modules/snabbdom/src/zeroC'
import {action, List, Nil} from '../../modules/action'

describe('concatC', () => {
  const P = (a: number, b: number) => action('+', a + b)
  const M = (a: number, b: number) => action('*', a * b)
  const D = (a: number, b: number) => action('/', a / b)
  it('should combine multiple command functions into one', () => {
    const actual = concatC(curry2(P), curry2(M))(1, 2)
    const expected = List(action('+', 3), action('*', 2))

    assert.deepEqual(actual, expected)
  })

  it('should be curried', () => {
    const actual = concatC(P, M)(1)(2)
    const expected = List(action('+', 3), action('*', 2))

    assert.deepEqual(actual, expected)
  })

  it('should be associative (P + M) + D === P + (M + D)', () => {
    const a = concatC(concatC(P, M), D)
    const b = concatC(P, concatC(M, D))
    assert.deepEqual(a(1, 2), b(1, 2))
  })

  it('should satisfy additive identity P + Z === P', () => {
    const a = concatC(P, zeroC)
    const b = P
    assert.deepEqual(a(1, 2), b(1, 2))
  })

  it('should satisfy additive identity Z + Z === Z', () => {
    const actual = concatC(zeroC, zeroC)(1, 2)
    const expected = Nil()
    assert.deepEqual(actual, expected)
  })
})
