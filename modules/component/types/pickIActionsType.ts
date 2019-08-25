import {PPP} from './pickValueFromComponent'

/**
 * Picks input actions type from component or component props
 * @typeparam P Either ComponentProp or ComponentNext
 * @category ComponentNext
 */
export type iActions<P> = PPP<P, 'iActions'>
