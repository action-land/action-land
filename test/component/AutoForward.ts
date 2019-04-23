import {AutoForward, COM, Component} from '@action-land/component'
import {action} from '@action-land/core'
import {ISmitten} from '@action-land/smitten'
import {matchC, matchR} from '@action-land/tarz'
import * as assert from 'assert'
import * as R from 'ramda'

describe('AutoForward', () => {
  /**
   * IChild Component
   */
  interface IChild {
    C: number
  }
  const child = COM<IChild, {}, [], string>(
    (): IChild => ({C: 3}),
    matchR<IChild>({set: R.assoc('C')}),
    matchC<IChild>({set: action('bananas')}),
    (e: ISmitten, m: IChild, p: {}) => 'CHILD'
  )

  /**
   * IParent Component
   */
  interface IParent {
    A: number
    child: IChild
  }
  const parent = COM(
    (): IParent => ({A: 1, child: child.init()}),
    matchR<IParent>({get: R.prop('A')}),
    matchC<IParent>({get: action('bananas')}),
    (e: ISmitten, m: IParent, p: {color: string}) =>
      `PARENT ${child.view(e.of('child'), m.child, {})}`
  )

  const component = parent.map(AutoForward({child}))

  it('should forward update to child components', () => {
    const actual = component.update(
      action('child', action('set', 5)),
      component.init()
    )

    const expected = {
      '@@forward': {keys: ['child']},
      A: 1,
      child: {C: 5}
    }
    assert.deepStrictEqual(actual, expected)
  })

  it('should call the corresponding commands of the given component', () => {
    const actual = component.command(
      action('child', action('set', 5)),
      component.init()
    )
    const expected = action('child', action('bananas', 5))
    assert.deepStrictEqual(actual, expected)
  })

  it('should update @@forward', () => {
    const actual = component.init()
    const expected = {
      ...parent.init(),
      '@@forward': {
        keys: ['child']
      }
    }
    assert.deepStrictEqual(actual, expected)
  })
})

/**
 * T Y P E S C R I P T
 */

function test(
  eq: <T>(a: T, b: T) => void,
  ChildComponent: Component<
    {count: number},
    {color: string},
    [number, string, Date],
    string
  >,
  ParentComponent: Component<
    {child: {count: number}; name: string},
    {color: string},
    [number, string, Date],
    string
  >,
  expected: Component<
    {'@@forward': {keys: string[]}; child: {count: number}; name: string},
    {color: string},
    [number, string, Date],
    string
  >
): void {
  eq(AutoForward({child: ChildComponent})(ParentComponent), expected)
}
