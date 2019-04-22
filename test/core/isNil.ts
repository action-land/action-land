import {action, isNil} from '@action-land/core'
import * as assert from 'assert'

describe('isNil', () => {
  it('should return false if obj is not Nil action', () => {
    assert.ok(!isNil(action('A', [10])))
  })
})
