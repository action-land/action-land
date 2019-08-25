import {Action} from '@action-land/core'

/**
 * Component typing signature
 * 1. **iState**: Initial state requiered by component to exist.
 * 2. **oState**: Extends iState may contain additional properties.
 * 3. **iActions**: Set of actions (messages) handled by component.
 * 4. **oActions**: Set of actions fired by component for causing side effects.
 * 5. **oView**: View returned by component.
 * 6. **iChildren**: Set of child component respresented as key value pair.
 * 7. **iprops**: Input param types for view.
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
