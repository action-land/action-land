/**
 * Created by tushar on 25/06/18
 */
import {curry2} from 'ts-curry'
import {action, Action} from 'action-type'
import * as assert from 'assert'
import {concatR} from '../../modules/snabbdom/src/concatR'
import {zeroR} from '../../modules/snabbdom/src/zeroR'

describe('concatR', () => {
  const TEST_ACTION = action('SAMPLE', 100)
  const P = (a: Action<number>, b: number) => a.value + b
  const Q = (a: Action<number>, b: number) => a.value * b
  it('should combine multiple reducers into one', () => {
    const r = concatR(P, Q)
    const actual = r(TEST_ACTION, 20)
    const expected = 100 * (100 + 20)
    assert.equal(actual, expected)
  })
  it('should combine multiple curried reducers into one', () => {
    const r0 = curry2(P)
    const r1 = curry2(Q)
    const r = concatR(r0, r1)
    const actual = r(TEST_ACTION, 20)
    const expected = 100 * (100 + 20)
    assert.equal(actual, expected)
  })
  it('should return a curried function', () => {
    const r0 = curry2(P)
    const r1 = curry2(Q)
    const r = concatR(r0, r1)
    const actual = r(TEST_ACTION)(20)
    const expected = 100 * (100 + 20)
    assert.equal(actual, expected)
  })

  it('should satisfy right identity', () => {
    const r = concatR(P, zeroR)
    const actual = r(TEST_ACTION)(20)
    const expected = 100 + 20
    assert.equal(actual, expected)
  })
})
