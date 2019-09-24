import {ListComponentState} from '@action-land/component/src/listComponentState'
import * as assert from 'assert'
import {Either} from 'standard-data-structures'

describe('listComponentState', () => {
  describe('getItem', () => {
    it('should return undefined on trying to access any item of the empty list', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const actual = state.get('key1')
      assert.deepEqual(actual, Either.left(null))
    })
  })
  describe('fold', () => {
    it('should fold to seed value of the list is empty', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const actual = state.fold(0, (c, k, acc) => acc + c.count)
      assert.strictEqual(actual, 0)
    })
    it('should reduce to a value based on function passed', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state
        .set('j', {count: 10})
        .set('k', {count: 20})
        .set('l', {count: 30})
      const actual = updatedState.fold(0, (c, k, acc) => acc + c.count)
      assert.strictEqual(actual, 60)
    })
  })
  describe('update list', () => {
    it('should add initialize on Kth key if not present', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.set('k', {count: 20})
      const actual = updatedState.get('k').getRightOrElse({count: 10})
      const expected = {count: 20}
      assert.deepEqual(actual, expected)
    })
    it('should add item to the list if not present', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.set('k', {count: 20})
      const actual = updatedState.fold(
        [] as {count: number}[],
        (current, key, acc) => acc.concat([current])
      )
      const expected = [{count: 20}]
      assert.deepEqual(actual, expected)
    })
    it('should prepend item to the list', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.set('j', {count: 20})
      const updatedState2 = updatedState.set('k', {count: 30})
      const actual = updatedState2.fold(
        [] as {count: number}[],
        (current, key, acc) => acc.concat([current])
      )
      const expected = [{count: 30}, {count: 20}]
      assert.deepEqual(actual, expected)
    })
    it('should override the item state when set callled multiple time', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.set('j', {count: 20})
      const updatedState2 = updatedState.set('j', {count: 30})
      const actual = updatedState2.fold(
        [] as {count: number}[],
        (current, key, acc) => acc.concat([current])
      )
      const expected = [{count: 30}]
      assert.deepEqual(actual, expected)
    })
  })
})
