import {isList, action} from '../../modules/action/index'
import * as assert from 'assert'

describe('isList', () => {
  it('should return false if the obj not a List', () => {
    assert.ok(!isList(action('A', [10])))
  })
})
