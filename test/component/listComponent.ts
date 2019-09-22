import {ListComponentState} from '@action-land/component/src/listComponentState'
import * as assert from 'assert'
describe('listComponentState', () => {
  const state = ListComponentState.of(() => ({
    count: 10
  }))
  describe('getItem', () => {
    it('should return undefined on trying to access any item of the empty list', () => {
      const actual = state.getItem('key1')
      assert.strictEqual(actual, undefined)
    })
  })
  describe('getItems', () => {
    it('return Empty Array for empty list component', () => {
      const actual = state.getItems()
      assert.deepEqual(actual, [])
    })
  })

  describe('update list', () => {
    it('should add initialize on Kth key if not present', () => {
      const updatedComponent = state.update(a => ({count: a.count + 10}), 'k')
      const actual = updatedComponent.getItem('k')
      const expected = {count: 20}
      assert.deepEqual(actual, expected)
    })
    it('should add item to the array if not present', () => {
      const updatedComponent = state.update(a => ({count: a.count + 10}), 'k')
      const actual = updatedComponent.getItems()
      const expected = [{count: 20}]
      assert.deepEqual(actual, expected)
    })
    it('should push item to the end of the array if not present', () => {
      const updatedComponent = state.update(a => ({count: a.count + 10}), 'j')
      const updatedComponent2 = updatedComponent.update(
        a => ({count: a.count + 20}),
        'k'
      )
      const actual = updatedComponent2.getItems()
      const expected = [{count: 20}, {count: 30}]
      assert.deepEqual(actual, expected)
    })
  })

  describe('fold', () => {
    it('should fold to seed value of the list is empty', () => {
      const actual = state.fold(0, (a, s) => a + s.count)
      assert.strictEqual(actual, 0)
    })
    it('should reduce to a value based on function passed', () => {
      const updatedComponent = state
        .update(a => ({count: a.count + 10}), 'j')
        .update(a => ({count: a.count + 20}), 'k')
        .update(a => ({count: a.count + 30}), 'l')
      const actual = updatedComponent.fold(0, (a, s) => a + s.count)
      assert.strictEqual(actual, 90)
    })
  })
  describe('clone', () => {
    it('should reduce to a value based on function passed', () => {
      const updatedComponent = state
        .update(a => ({count: a.count + 10}), 'j')
        .update(a => ({count: a.count + 20}), 'k')
        .update(a => ({count: a.count + 30}), 'l')
      const actual = updatedComponent.clone()
      assert.deepEqual(actual, updatedComponent)
      assert.notStrictEqual(actual, updatedComponent)
    })
  })
})
