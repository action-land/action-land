import {PPP} from './pickValueFromComponent'

/**
 * Picks component view props from component or component props
 * @typeparam P Either ComponentProp or ComponentNext
 * @category ComponentNext
 */
export type iProps<P> = PPP<P, 'iProps'>
