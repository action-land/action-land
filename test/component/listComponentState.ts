import {ListComponentState} from '@action-land/component/src/listComponentState'
import * as assert from 'assert'

describe('listComponentState', () => {
  describe('getItem', () => {
    it('should return undefined on trying to access any item of the empty list', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const actual = state.getItem('key1')
      assert.strictEqual(actual, null)
    })
  })
  describe('getItems', () => {
    it('return Empty Array for empty list component', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const actual = state.getItems()
      assert.deepEqual(actual, [])
    })
  })

  describe('update list', () => {
    it('should add initialize on Kth key if not present', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.insertItem('k', {count: 20})
      const actual = updatedState.getItem('k')
      const expected = {count: 20}
      assert.deepEqual(actual, expected)
    })
    it('should add item to the list if not present', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.insertItem('k', {count: 20})
      const actual = updatedState.getItems()
      const expected = [{count: 20}]
      assert.deepEqual(actual, expected)
    })
    it('should prepend item to the list', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.insertItem('j', {count: 20})
      const updatedState2 = updatedState.insertItem('k', {count: 30})
      const actual = updatedState2.getItems()
      const expected = [{count: 30}, {count: 20}]
      assert.deepEqual(actual, expected)
    })
  })

  describe('fold', () => {
    it('should fold to seed value of the list is empty', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const actual = state.fold(0, (s, a) => a + s.state.count)
      assert.strictEqual(actual, 0)
    })
    it('should reduce to a value based on function passed', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state
        .insertItem('j', {count: 10})
        .insertItem('k', {count: 20})
        .insertItem('l', {count: 30})
      const actual = updatedState.fold(0, (s, a) => a + s.state.count)
      assert.strictEqual(actual, 60)
    })
  })
})
