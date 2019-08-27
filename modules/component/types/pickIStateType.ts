import {PPP} from './pickValueFromComponent'

/**
 * Pick input state type from component or component props
 * @typeparam P Either ComponentProp or ComponentNext
 * @category ComponentNext
 */
export type iState<P> = PPP<P, 'iState'>
