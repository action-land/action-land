import {Action} from './src/action'

export {action, Action} from './src/action'
export {isAction} from './src/isAction'

export {List} from './src/list'
export {isList} from './src/isList'

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
