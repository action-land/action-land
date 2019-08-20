import {Action} from '@action-land/core'

declare function $<F, B>(a: <S>(s: S, f: F) => B): {spec: F; ret: B}
declare function ID<T>(): T

// Action.fold should handle Action.nil()
Action.fold(0, Action.nil(), (s, a) => {
  // $ExpectType Nil
  a

  // $ExpectType number
  s
  return s
})

// Action.fold should handle lifted nils
Action.fold(0, Action.nil().lift('T'), (s, a) => {
  // $ExpectType Action<Action<never, never>, "T">
  a

  // $ExpectType number
  s
  return s
})

// Action.fold should handle lifted nils
Action.fold(0, Action.nil().lift('T'), {
  T: (s, a) => {
    // $ExpectType Action<never, never>
    a

    // FIXME: type should be number and not 0
    // $ExpectType 0
    s
    return s
  }
})

// Action.fold should handle union of actions
Action.fold({count: 10}, ID<Action<1, 'B1'> | Action<2, 'B2'>>(), {
  B1: (s, a) => {
    // $ExpectType 1
    a

    // $ExpectType { count: number; }
    s

    return {count: s.count + a}
  }
})

// Action.fold should lifted handle union of actions
Action.fold({count: 10}, ID<Action<Action<1, 'B1'> | Action<2, 'B2'>, 'A'>>(), {
  A: (s, a) => {
    // $ExpectType Action<1, "B1"> | Action<2, "B2">
    a

    // $ExpectType { count: number; }
    s

    return {count: s.count + a.value}
  }
})

// Action.fold should lifted handle union of actions thru a nested spec
Action.fold({count: 10}, ID<Action<Action<1, 'B1'> | Action<2, 'B2'>, 'A'>>(), {
  A: {
    B1: (s, a) => {
      // $ExpectType 1
      a

      // $ExpectType { count: number; }
      s

      return {count: s.count + a}
    }
  }
})
