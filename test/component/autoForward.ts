import {AutoForward, COM, Component} from '@action-land/component'
import {action} from '@action-land/core'
import {Smitten} from '@action-land/smitten'
import {matchC, matchR} from '@action-land/tarz'
import * as assert from 'assert'
import * as R from 'ramda'

describe('AutoForward', () => {
  /**
   * Child Component
   */
  type Child = {
    C: number
  }
  const child = COM<Child, {}, [], string>(
    (): Child => ({C: 3}),
    matchR<Child>({set: R.assoc('C')}),
    matchC<Child>({set: action('bananas')}),
    (e: Smitten, m: Child, p: {}) => {
      return 'CHILD'
    }
  )

  /**
   * Parent Component
   */
  type Parent = {
    A: number
    child: Child
  }
  const parent = COM(
    (): Parent => ({A: 1, child: child.init()}),
    matchR<Parent>({get: R.prop('A')}),
    matchC<Parent>({get: action('bananas')}),
    (e: Smitten, m: Parent, p: {color: string}) => {
      return 'PARENT' + child.view(e.of('child'), m.child, {})
    }
  )

  const component = parent.map(AutoForward({child: child}))

  it('should forward update to child components', () => {
    const actual = component.update(
      action('child', action('set', 5)),
      component.init()
    )

    const expected = {
      A: 1,
      child: {C: 5},
      '@@forward': {keys: ['child']}
    }
    assert.deepEqual(actual, expected)
  })

  it('should call the corresponding commands of the given component', () => {
    const actual = component.command(
      action('child', action('set', 5)),
      component.init()
    )
    const expected = action('child', action('bananas', 5))
    assert.deepEqual(actual, expected)
  })

  it('should update @@forward', () => {
    const actual = component.init()
    const expected = {
      ...parent.init(),
      '@@forward': {
        keys: ['child']
      }
    }
    assert.deepEqual(actual, expected)
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
    {name: string; child: {count: number}},
    {color: string},
    [number, string, Date],
    string
  >,
  expected: Component<
    {name: string; child: {count: number}; '@@forward': {keys: string[]}},
    {color: string},
    [number, string, Date],
    string
  >
): void {
  eq(AutoForward({child: ChildComponent})(ParentComponent), expected)
}
