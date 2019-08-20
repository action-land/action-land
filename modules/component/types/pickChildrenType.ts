import {PPP} from './pickValueFromComponent'

/**
 * Picks component children type from component or component props
 */
export type iChildren<P> = PPP<P, 'iChildren'>
