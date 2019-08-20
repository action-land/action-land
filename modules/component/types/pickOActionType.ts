import {PPP} from './pickValueFromComponent'

/**
 * Picks input actions type from component or component props
 */
export type oActions<P> = PPP<P, 'oActions'>
