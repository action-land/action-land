import {List} from 'standard-data-structures'

type keyType = string | number
type ListItem<S> = {state: S; key: keyType}
export class ListComponentState<S> {
  private constructor(
    private baseInit: () => S,
    private readonly items: List<ListItem<S>> = List.empty(),
    private readonly lookUp: {[k in keyType]?: List<ListItem<S>>} = {}
  ) {}
  static of<T>(baseInit: () => T) {
    return new ListComponentState(baseInit)
  }
  insertItem(k: keyType, value: S = this.baseInit()) {
    const items = this.items.prepend({state: value, key: k})
    return new ListComponentState(this.baseInit, items, {
      ...this.lookUp,
      [k]: items
    })
  }
  getItem(k: keyType): S | null {
    const node = this.lookUp[k]
    return node ? node.head.state : null
  }
  getItems(): S[] {
    return this.items.isEmpty
      ? []
      : this.items.map(a => a.state).map(i => i).asArray
  }
  fold<T>(s: T, fn: (current: ListItem<S>, acc: T) => T): T {
    return this.items.fold(s, fn)
  }
}
