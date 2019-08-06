import {ComponentNext} from '@action-land/component'
import {action, Action} from '@action-land/core'
import { ComponentProps } from './componentNext'

const simpleEmitter = (
  listener: (a: any) => void,
  actionTypes: string[] = []
) => {
  return {
    of: (type: string) => {
      return simpleEmitter(listener, [type].concat(actionTypes))
    },
    emit: value => {
      let outputAction = {
        type: actionTypes[0],
        value
      }
      actionTypes.forEach((type, index) => {
        if (index > 0) {
          outputAction = action(type, action)
        }
      })
      listener(outputAction)
    }
  }
}


const runIO = <T>(SE: Action<unknown>) => {
    const doSideEffect  = {
        a: (val) => action('c' , 10),
        b: (val) => action('d' , 10)
    }
}
const childComponent2 = ComponentNext.lift({c: 100})
  .matchR('inc', (e, s) => ({
    c: s.c + 1
  }))
  .matchC('inc', (e, s) => action('incIO', s))
  .render((_, p) => _.state.c)

const childComponent1 = ComponentNext.lift({b: 100})
  .matchR('inc', (e, s) => ({
    b: s.b + 1
  }))
  .matchC('inc', (e, s) => action('incIO', s))
  .install({
    child: childComponent2
  })
  .render((_, p) => _.state.node.b + _.children.child())

const mainComponent = ComponentNext.lift({a: 0})
  .matchR('inc', (e, s) => ({
    a: s.a + 1
  }))
  .install({
    child: childComponent1
  })

const e = simpleEmitter((action) => {
    const {newState, newAction} = mainComponent.eval(action, state)
    state = newState


})
let state = mainComponent.initState
