import {Action} from '@action-land/core'

/**
 * Component typing signature
 * 1. **iState**: Initial state requiered by component to exist.
 * 2. **oState**: Extends iState i.e may contain additional properties.
 * 3. **iActions**: Set of actions handled by component.
 * 4. **oActions**: Set of actions fired by component.
 * 5. **oView**: View returned by component.
 * 6. **iChildren**: Set of child components represented as key value pair.
 * 7. **iProps**: Input param for view.
 * @category ComponentNext
 */

export type ComponentProps = {
  readonly iState?: unknown
  readonly oState?: unknown
  readonly iActions?: Action<unknown>
  readonly oActions?: Action<unknown>
  readonly oView?: unknown
  readonly iChildren?: unknown
  readonly iProps?: unknown
}
