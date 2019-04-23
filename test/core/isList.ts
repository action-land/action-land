import * as assert from 'assert'

import {action, isList} from '../../modules/core/index'

describe('isList', () => {
  it('should return false if the obj not a List', () => {
    assert.ok(!isList(action('A', [10])))
  })
})
