import {PPP} from './pickValueFromComponent'

/**
 * Picks input actions type from component or component props
 */
export type iActions<P> = PPP<P, 'iActions'>
