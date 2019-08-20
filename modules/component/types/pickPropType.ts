import {PPP} from './pickValueFromComponent'

/**
 * Picks component view props type from component or component props
 */
export type iProps<P> = PPP<P, 'iProps'>
