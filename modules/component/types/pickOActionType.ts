import {PPP} from './pickValueFromComponent'

/**
 * Pick input actions type from component or component props
 * @typeparam P Either ComponentProps or ComponentNext
 * @category ComponentNext
 */
export type oActions<P> = PPP<P, 'oActions'>
