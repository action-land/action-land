/**
 * Created by tushar on 26/06/18
 */

import * as assert from 'assert'
import {curry2} from 'ts-curry'

import {Action, action, List, Nil} from '../../modules/core/index'
import {concatC} from '../../modules/tarz/src/concatC'
import {zeroC} from '../../modules/tarz/src/zeroC'

describe('concatC', () => {
  const P = (a: number, b: number): Action<number> => action('+', a + b)
  const M = (a: number, b: number): Action<number> => action('*', a * b)
  const D = (a: number, b: number): Action<number> => action('/', a / b)
  it('should combine multiple command functions into one', () => {
    const actual = concatC(curry2(P), curry2(M))(1, 2)
    const expected = List(action('+', 3), action('*', 2))

    assert.deepStrictEqual(actual, expected)
  })

  it('should be curried', () => {
    const actual = concatC(P, M)(1)(2)
    const expected = List(action('+', 3), action('*', 2))

    assert.deepStrictEqual(actual, expected)
  })

  it('should be associative (P + M) + D === P + (M + D)', () => {
    const a = concatC(concatC(P, M), D)
    const b = concatC(P, concatC(M, D))
    assert.deepStrictEqual(a(1, 2), b(1, 2))
  })

  it('should satisfy additive identity P + Z === P', () => {
    const a = concatC(P, zeroC)
    const b = P
    assert.deepStrictEqual(a(1, 2), b(1, 2))
  })

  it('should satisfy additive identity Z + Z === Z', () => {
    const actual = concatC(zeroC, zeroC)(1, 2)
    const expected = Nil()
    assert.deepStrictEqual(actual, expected)
  })
})
