/**
 * Created by tushar on 25/06/18
 */

import * as assert from 'assert'
import {describe, it} from 'mocha'

import {action, isList, isNil, List, Nil} from '../../modules/core/index'

describe('List', () => {
  it('should return true if the obj is a List', () => {
    const actual = List(action('A', 100), action('B', 100))
    assert.ok(isList(actual))
  })

  it('should return the passed action if args.length=1', () => {
    const input = action('A', 10)
    const actual = List(input)
    assert.equal(actual, input)
  })

  it('should return Nil if the arg is Nil', () => {
    const actual = List(Nil())
    assert.ok(isNil(actual))
  })

  it('should return Nil if nothing is passed', () => {
    const actual = List()
    assert.ok(isNil(actual))
  })

  it('should skip Nil actions', () => {
    const actual = List(action('A', 0), Nil(), action('B', 1))
    const expected = List(action('A', 0), action('B', 1))
    assert.deepStrictEqual(actual, expected)
  })

  it('should return Nil when multiple Nil actions are passed', () => {
    const actual = List(Nil(), Nil())
    assert.ok(isNil(actual))
  })
})
