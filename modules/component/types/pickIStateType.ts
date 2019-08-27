import {PPP} from './pickValueFromComponent'

/**
 * Pick input state type from component or component props
 * @typeparam P Either ComponentProps or ComponentNext
 * @category ComponentNext
 */
export type iState<P> = PPP<P, 'iState'>
