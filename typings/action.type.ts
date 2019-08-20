import {action, Action} from '@action-land/core'

declare function $<F, B>(a: <S>(s: S, f: F) => B): {spec: F; ret: B}
declare function ID<T>(): T

// action.fold should safely handle Nil
// $ExpectType (seed: unknown, value: Action<never, never>) => unknown
$(Action.nil().fold).spec

// action.fold should safely handle non-nested actions
// $ExpectType (seed: unknown, value: Action<number, "A">) => unknown
$(action('A', 100).fold).spec

// action.fold should safely handle nested actions
// $ExpectType FoldSpec<Action<string, "A">, "B", unknown>
$(action('A', 'A').lift('B').fold).spec

// action.fold should handle union of actions
// $ExpectType FoldSpec<Action<1, "B1"> | Action<2, "B2">, "A", unknown>
$(ID<Action<Action<1, 'B1'> | Action<2, 'B2'>, 'A'>>().fold).spec
