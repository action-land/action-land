import {PPP} from './pickValueFromComponent'

/**
 * Pick view type from component or component props
 * @typeparam P Either ComponentProps or ComponentNext
 * @category ComponentNext
 */

export type oView<P> = PPP<P, 'oView'>
