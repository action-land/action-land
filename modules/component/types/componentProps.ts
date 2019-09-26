import {Action} from '@action-land/core'

/**
 * Component typing signature
 * 1. **iState**: Initial state of the component.
 * 2. **iActions**: Set of actions handled by component.
 * 3. **oActions**: Set of actions fired by component.
 * 4. **oView**: View returned by component.
 * 5. **iChildren**: Set of child components represented as key-value pair.
 * 6. **iProps**: Input param for view.
 * @category ComponentNext
 */

export type ComponentProps = {
  readonly iState?: unknown
  readonly iActions?: Action<unknown>
  readonly oActions?: Action<unknown>
  readonly oView?: unknown
  readonly iChildren?: unknown
  readonly iProps?: unknown
}
