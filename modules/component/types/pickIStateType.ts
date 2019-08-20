import {PPP} from './pickValueFromComponent'

/**
 * Picks input state type from component or component props
 */
export type iState<P> = PPP<P, 'iState'>
