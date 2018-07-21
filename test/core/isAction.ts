/**
 * Created by tushar on 01/07/18
 */

import {action, isAction} from '../../modules/core/index'
import {describe, it} from 'mocha'
import * as assert from 'assert'

describe('isAction', () => {
  it('should return true if obj is an action', () => {
    const actual = isAction(action('WONDER', {count: 10}))
    assert.ok(actual)
  })

  it('should return true if obj contains type/value', () => {
    const actual = isAction({type: 'WONDER', value: {count: 10}})
    assert.ok(actual)
  })

  it('should return false for primitive values', () => {
    assert.ok(!isAction(null))
    assert.ok(!isAction(undefined))
    assert.ok(!isAction(false))
    assert.ok(!isAction(0))
    assert.ok(!isAction(true))
  })
})
