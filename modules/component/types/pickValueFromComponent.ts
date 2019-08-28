import {ComponentNext} from '..'
import {ComponentProps} from './componentProps'
import {PP} from './pickValue'

/**
 * Extracts value type of the provided keys from ComponentNext or ComponentProps
 * @typeparam O Can be either ComponentNext class object or ComponentProps object
 * @typeparam K Any property from ComponentProps eg iState, oState, iActions etc.
 * @return type of passed property from ComponentProps
 * @category ComponentNext
 */
export type PPP<O, K extends keyof ComponentProps> = O extends ComponentNext<
  infer P
>
  ? PP<P, K>
  : O extends ComponentProps
  ? PP<O, K>
  : never
