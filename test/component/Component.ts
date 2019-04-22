/**
 * Created by tushar on 06/08/18
 */
import {COM, Component} from '@action-land/component'
import {Action, isNil, Nil} from '@action-land/core'
import {create, Smitten} from '@action-land/smitten'
import * as assert from 'assert'

describe('COM', () => {
  const component = COM(
    (count: string) => {
      return {count: Number(count)}
    },

    (action, state) => {
      return {...state, count: state.count + 1}
    },

    () => {
      return Nil()
    },

    (e, m, p: {color: string}) => {
      return 'Count:' + m.count + ':' + p.color
    }
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
      const e = create(() => {})
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
      component: Component<State, Params, Init, VNode>
    ) => {
      type Crazy = {crazy: boolean}

      const InitType = <Args extends any[], R>(
        fn0: (...t: Args) => R
      ): ((...t: Args) => R & Crazy) => (...t: Args): R & Crazy =>
        Object.assign(fn0(...t), {crazy: val})

      const UpdateType = <A, S>(fn: (a: A, s: S) => S) => (
        a: A,
        s: S & Crazy
      ): S & Crazy => fn(a, s) as S & Crazy

      const CommandType = <A, B, S>(fn: (a: A, s: S) => B) => (
        a: A,
        s: S & Crazy
      ): B => fn(a, s)

      const ViewType = <A, S, P>(fn: (e: Smitten, m: S, p: P) => VNode) => (
        e: Smitten,
        m: S & Crazy,
        p: P
      ): VNode => fn(e, m, p)

      return COM(
        InitType(component.init),
        UpdateType(component.update),
        CommandType(component.command),
        ViewType(component.view)
      )
    }

    it('should keep the component as is', () => {
      const newComponent = component.map(component => component)
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
  command: (a: string, b: {count: number}) => Action<any, {}>,
  view: (e: Smitten, m: {count: number}, p: {color: string}) => string,
  expected: Component<
    {count: number},
    {color: string},
    [string, number],
    string
  >
) {
  eq(COM(init, update, command, view), expected)
}
