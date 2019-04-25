/**
 * Created by tushar on 06/08/18
 */
import {COM, Component} from '@action-land/component'
import {IAction, isNil, Nil} from '@action-land/core'
import {create, ISmitten} from '@action-land/smitten'
import * as assert from 'assert'

// tslint:disable:no-any
describe('COM', () => {
  const component = COM(
    (count: string): {count: number} => ({count: Number(count)}),

    <T>(action: IAction<string, T>, state: {count: number}) => ({
      ...state,
      count: state.count + 1
    }),

    Nil,

    (e: ISmitten, m: {count: number}, p: {color: string}) =>
      `Count:${m.count}:${p.color}`
  )

  describe('init', () => {
    it('should return a new state on calling init', () => {
      const state = component.init('10')
      assert.deepStrictEqual(state, {count: 10})
    })
  })

  describe('update', () => {
    it('should increment count on update', () => {
      const iState = component.init('10')
      const state = component.update({}, iState)
      assert.deepStrictEqual(state, {count: 11})
    })
  })

  describe('command', () => {
    it('should return Nil() on calling command', () => {
      const iState = component.init('10')
      const value = component.command({}, iState)
      assert.ok(isNil(value))
    })
  })

  describe('view', () => {
    it('should return Nil() on calling command', () => {
      const e = create(() => {
        return
      })
      const iState = component.init('10')
      const value = component.view(e, iState, {color: 'red'})
      assert.strictEqual(value, 'Count:10:red')
    })
  })

  describe('map', () => {
    const AUTO_CRAZY = (val: boolean) => <
      State,
      Params,
      Init extends any[],
      VNode
    >(
      crazyComponent: Component<State, Params, Init, VNode>
    ) => {
      interface ICrazy {
        crazy: boolean
      }

      const InitType = <Args extends any[], R>(
        fn0: (...t: Args) => R
      ): ((...t: Args) => R & ICrazy) => (...t: Args): R & ICrazy =>
        Object.assign(fn0(...t), {crazy: val})

      const UpdateType = <A, S>(fn: (a: A, s: S) => S) => (
        a: A,
        s: S & ICrazy
      ): S & ICrazy => fn(a, s) as S & ICrazy

      const CommandType = <A, B, S>(fn: (a: A, s: S) => B) => fn

      const ViewType = <A, S, P>(fn: (e: ISmitten, m: S, p: P) => VNode) => fn

      return COM(
        InitType(crazyComponent.init),
        UpdateType(crazyComponent.update),
        CommandType(crazyComponent.command),
        ViewType(crazyComponent.view)
      )
    }

    it('should keep the component as is', () => {
      const newComponent = component.map(child => child)
      // tslint:disable-next-line: no-inferred-empty-object-type
      const state = newComponent.init('100')
      assert.deepStrictEqual(state, {count: 100})
    })

    it('should transform the component', () => {
      const newComponent = component.map(AUTO_CRAZY(true))

      assert.deepStrictEqual(newComponent.init('100'), {
        count: 100,
        crazy: true
      })
    })
  })
})

/**
 * T Y P E S C R I P T
 */
function test(
  eq: <T>(a: T, b: T) => void,
  init: (a: string, b: number) => {count: number},
  update: (a: string, b: {count: number}) => {count: number},
  command: (a: string, b: {count: number}) => IAction<string, unknown>,
  view: (e: ISmitten, m: {count: number}, p: {color: string}) => string,
  expected: Component<
    {count: number},
    {color: string},
    [string, number],
    string
  >
): void {
  eq(COM(init, update, command, view), expected)
}
