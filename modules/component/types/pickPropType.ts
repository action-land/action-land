import {PPP} from './pickValueFromComponent'

/**
 * Picks component view props from component or component props
 * @typeparam P Either ComponentProps or ComponentNext
 * @category ComponentNext
 */
export type iProps<P> = PPP<P, 'iProps'>
