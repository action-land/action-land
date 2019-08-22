import {Action} from '@action-land/core'

declare function $<F, B>(a: <S>(s: S, f: F) => B): {spec: F; ret: B}
declare function ID<T>(): T

// Action.fold should handle Action.nil()
Action.fold(Action.nil(), 0, (a, s) => {
  // $ExpectType Nil
  a

  // $ExpectType number
  s
  return s
})

// Action.fold should handle lifted nils
Action.fold(Action.nil().lift('T'), 0, (a, s) => {
  // $ExpectType Action<Action<never, never>, "T">
  a

  // $ExpectType number
  s
  return s
})

// Action.fold should handle lifted nils
Action.fold(Action.nil().lift('T'), 0, {
  T: (a, s) => {
    // $ExpectType Action<never, never>
    a

    // FIXME: type should be number and not 0
    // $ExpectType 0
    s
    return s
  }
})

// Action.fold should handle union of actions
Action.fold(
  ID<Action<1, 'B1'> | Action<2, 'B2'>>(),
  {count: 10},
  {
    B1: (a, s) => {
      // $ExpectType 1
      a

      // $ExpectType { count: number; }
      s

      return {count: s.count + a}
    }
  }
)

// Action.fold should lifted handle union of actions
Action.fold(
  ID<Action<Action<1, 'B1'> | Action<2, 'B2'>, 'A'>>(),
  {count: 10},
  {
    A: (a, s) => {
      // $ExpectType Action<1, "B1"> | Action<2, "B2">
      a

      // $ExpectType { count: number; }
      s

      return {count: s.count + a.value}
    }
  }
)

// Action.fold should lifted handle union of actions thru a nested spec
Action.fold(
  ID<Action<Action<1, 'B1'> | Action<2, 'B2'>, 'A'>>(),
  {count: 10},
  {
    A: {
      B1: (a, s) => {
        // $ExpectType 1
        a

        // $ExpectType { count: number; }
        s

        return {count: s.count + a}
      }
    }
  }
)
