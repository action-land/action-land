import {PPP} from './pickValueFromComponent'

/**
 * Picks output state type from component or component props
 * @typeparam P Either ComponentProp or ComponentNext
 * @category ComponentNext
 */
export type oState<P> = PPP<P, 'oState'>
