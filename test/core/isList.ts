import * as assert from 'assert'

import {action, isList} from '../../modules/core/index'

// tslint:disable: no-magic-numbers

describe('isList', () => {
  it('should return false if the obj not a List', () => {
    assert.ok(!isList(action('A', [10])))
  })
})
