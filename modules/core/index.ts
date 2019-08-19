import {Action} from './src/action'

export {action, Action} from './src/action'
export {isList} from './src/isList'
export {List} from './src/list'

/**
 * Use [[Action.nil]]
 * @deprecated
 */
export const Nil = Action.nil

/**
 * Use [[Action.isNil]]
 * @deprecated
 */
export const isNil = Action.isNil

/**
 * Use [[Action.isAction]]
 * @deprecated
 */
export const isAction = Action.isAction
