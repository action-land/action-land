import {PPP} from './pickValueFromComponent'

/**
 * Picks component children type from component or component props
 * @typeparam P Either ComponentProp or ComponentNext
 * @category ComponentNext
 */
export type iChildren<P> = PPP<P, 'iChildren'>
