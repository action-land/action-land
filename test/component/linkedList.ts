import {LinkedList} from '@action-land/component/internals/linkedList'
import * as assert from 'assert'

describe('linked list', () => {
  it('should create a linked list with single node', () => {
    const l = LinkedList.of(10)
    assert.ok(l instanceof LinkedList)
  })
  it('should prepend and create a new list', () => {
    const l = LinkedList.of(10).prepend(20)
    const r = l.reduce(0, (a, b) => a + b)
    assert.strictEqual(r, 30)
  })
})
