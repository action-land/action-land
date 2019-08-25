import {PPP} from './pickValueFromComponent'

/**
 * Picks input actions type from component or component props
 * @typeparam P Either ComponentProp or ComponentNext
 * @category ComponentNext
 */

export type oView<P> = PPP<P, 'oView'>
