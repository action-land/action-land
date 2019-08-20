import {action, Action} from '@action-land/core'

declare function $<F, B>(a: <S>(s: S, f: F) => B): {spec: F; ret: B}
declare function bind3<A, B, C, R>(
  fn: (A: A, B: B, C: C) => R
): (A: A, B: B) => C
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

// action.fold should handle nested union of actions
// $ExpectType FoldSpec<Action<1, "B1"> | Action<2, "B2">, "A", unknown>
$(ID<Action<Action<1, 'B1'> | Action<2, 'B2'>, 'A'>>().fold).spec

// Action.grab should handle Action.nil()
Action.grab(0, Action.nil(), (s, a) => {
  // $ExpectType Nil
  a
  // $ExpectType number
  s
  return s
})

// Action.grab should handle lifted nils
Action.grab(0, Action.nil().lift('T'), (s, a) => {
  // $ExpectType Action<Action<never, never>, "T">
  a

  // $ExpectType number
  s
  return s
})

// Action.grab should handle lifted nils
Action.grab(0, Action.nil().lift('T'), {
  T: (s, a) => {
    // $ExpectType Action<never, never>
    a

    // FIXME: type should be number and not 0
    // $ExpectType 0
    s
    return s
  }
})

// Action.grab should handle union of actions
Action.grab(0, ID<Action<1, 'B1'> | Action<2, 'B2'>>(), {
  B1: (s, a) => {
    // $ExpectType 1
    a

    // $ExpectType 0
    s
    return s + a
  }
})
