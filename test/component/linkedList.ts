import {LinkedList} from '@action-land/component/internals/linkedList'
import * as assert from 'assert'
describe('linked list', () => {
  it('should create a linked list with single node', () => {
    const l1 = new LinkedList().concat('10')
    const actual = l1.getHead()
    const expected = {
      value: '10',
      next: null
    }
    assert.deepStrictEqual(actual, expected)
  })
  it('should concat passed value in front of the linked list', () => {
    const l1 = new LinkedList().concat('10').concat('12')
    const actual = l1.getHead()
    const expected = {
      value: '12',
      next: {
        value: '10',
        next: null
      }
    }
    assert.deepStrictEqual(actual, expected)
  })
  it('should concat passed value in front of the linked list', () => {
    const l1 = new LinkedList().concat(['10', '12'])
    const actual = l1.getHead()
    const expected = {
      value: '12',
      next: {
        value: '10',
        next: null
      }
    }
    assert.deepStrictEqual(actual, expected)
  })
})
