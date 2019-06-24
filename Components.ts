type Action<T = unknown, V = unknown> = [T, V]

type Component<S1, V, IA1 = never, OA1 = never, C1 = unknown, P1 = never> = {
  matchR<AT extends string | number, AV, S2>(
    type: AT,
    cb: (v: AV, s: S1) => S2
  ): Component<S2, V, IA1 | Action<AT, AV>, OA1, C1, P1>

  matchC<AT extends string | number, AV, OT extends string | number, OV>(
    type: AT,
    cb: (v: AV, s: S1) => Action<OT, OV>
  ): Component<S1, V, IA1 | Action<AT, AV>, OA1 | Action<OT, OV>>

  forward<K extends string | number, S2, IA2, OA2, C2, P2>(
    k: K,
    c: Component<S2, V, IA2, OA2, C2, P2>
  ): Component<
    S1 & {[k in K]: S2},
    V,
    IA1 | (IA2 extends never ? never : Action<K, IA2>),
    OA1 | (OA2 extends never ? never : Action<K, OA2>),
    C1 & {[k in K]: Component<S2, V, IA2, OA2, C2, P2>},
    P1
  >

  view(
    cb: (e: (act: IA1) => void, s: S1, v: {[k in keyof C1]: C1[k]}) => V
  ): Component<S1, V, IA1, OA1, C1, P1>
  render(props: P1): V
}

type VNode = string
declare function h(
  type: string,
  props: {on?: {[s: string]: string}},
  children: [VNode]
): VNode
declare const c1: Component<
  {color: string},
  string,
  Action<'click', Event>,
  never
>

declare const c2: Component<
  {age: number},
  string,
  Action<'GQL', Response>,
  never,
  never,
  {name: string}
>

const a = c1
  .matchR('hover', (ev: MouseEvent, s) => ({
    color: s.color.toLowerCase()
  }))
  .matchR('hover', (ev: Response, s) => ({
    sign: s.color.toUpperCase()
  }))
  .matchC('gql', (res: Response, s) => ['abc', res])
  .forward('c2', c2)
  .view((e, s, v) => {
    return h('div', {}, [h('button', {}, [v.c2.render({name: 'tushar'})])])
  })

const b = c1.matchC('keydown', (v: KeyboardEvent, s: {color: string}) => [
  'set',
  v.charCode
])

/**
 * Fix matchR/ match C typings to accomodate duplicate action types
 * Emitter to function like click: e.click
 */
