import {action, isNil, Nil} from '@action-land/core'
import * as assert from 'assert'

// tslint:disable: no-magic-numbers

describe('isNil', () => {
  it('should return false if obj is not Nil action', () => {
    assert.ok(!isNil(action('A', [10])))
  })
  it('should return true if action is a Nil Action', () => {
    assert.ok(isNil(Nil()))
  })
})
