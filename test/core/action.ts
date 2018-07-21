import {describe, it} from 'mocha'
import * as assert from 'assert'
import {action, Nil, isNil} from '../../modules/core/index'

describe('action', () => {
  it('should return an action', () => {
    const actual = action('WONDER', {count: 10})
    const expected = {type: 'WONDER', value: {count: 10}}
    assert.deepEqual(actual, expected)
  })

  it('should be curried', () => {
    const actual = action('WONDER')({count: 10})
    const expected = {type: 'WONDER', value: {count: 10}}
    assert.deepEqual(actual, expected)
  })

  it('should accept type as number', () => {
    const actual = action(120)({count: 10})
    const expected = {type: 120, value: {count: 10}}
    assert.deepEqual(actual, expected)
  })

  it('should ignore Nil values', () => {
    const actual = action('WIND', Nil())
    assert.ok(isNil(actual))
  })
})
