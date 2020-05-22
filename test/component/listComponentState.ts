import {ListComponentState} from '@action-land/component/src/listComponentState'
import * as assert from 'assert'
import {Option} from 'standard-data-structures'

describe('listComponentState', () => {
  describe('getItem', () => {
    it('should return undefined on trying to access any item of the empty list', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const actual = state.get('key1')
      assert.deepEqual(actual, Option.none())
    })
    it('should return 0 if the state is 0', () => {
      const state = ListComponentState.of(() => 10).set('key1', 0)
      const actual = state.get('key1')
      assert.deepEqual(actual, Option.some(0))
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
    it('should reduce to a value based on function even if one of the state in list is 0', () => {
      const state = ListComponentState.of(() => 10)
      const updatedState = state
        .set('j', 0)
        .set('k', 20)
        .set('l', 30)
      const actual = updatedState.fold(0, (c, k, acc) => acc + c)
      assert.strictEqual(actual, 50)
    })
  })
  describe('update list', () => {
    it('should add initialize on Kth key if not present', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.set('k', {count: 20})
      const actual = updatedState.get('k').getOrElse({count: 10})
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
    it('should override the item state when set called multiple time', () => {
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
    it('should override the item state when set called multiple time and initial state is 0', () => {
      const state = ListComponentState.of(() => 0)
      const updatedState = state.set('j', 0)
      const updatedState2 = updatedState.set('j', 1)
      const actual = updatedState2.fold([] as number[], (current, key, acc) =>
        acc.concat([current])
      )
      const expected = [1]
      assert.deepEqual(actual, expected)
    })
    it('should accept an `Option` as input', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.set('k', Option.some({count: 20}))
      const actual = updatedState.get('k').getOrElse({count: 10})
      const expected = {count: 20}
      assert.deepEqual(actual, expected)
    })
    it('should accept an `Option.none` as input', () => {
      const state = ListComponentState.of(() => ({
        count: 10
      }))
      const updatedState = state.set('k', Option.none())
      const actual = updatedState.get('k').getOrElse({count: 5})
      const expected = {count: 10}
      assert.deepEqual(actual, expected)
    })
  })
})
