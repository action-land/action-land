/**
 * Extracts values of the provided keys from ComponentNext or ComponentProps
 */
import {ComponentNext} from '..'
import {ComponentProps} from './componentProps'
import {PP} from './pickValue'

export type PPP<O, K extends keyof ComponentProps> = O extends ComponentNext<
  infer P
>
  ? PP<P, K>
  : O extends ComponentProps
  ? PP<O, K>
  : never
