import {HashMap, List, Option} from 'standard-data-structures'

type ListKey = string | number

export class ListComponentState<S> {
  private constructor(
    private baseInit: () => S,
    private readonly items: List<ListKey>,
    private readonly lookUp: HashMap<ListKey, S>
  ) {}
  static of<S>(baseInit: () => S): ListComponentState<S> {
    return new ListComponentState(baseInit, List.empty(), HashMap.of())
  }
  set(k: ListKey, value: S = this.baseInit()): ListComponentState<S> {
    const items = this.lookUp.has(k) ? this.items : this.items.prepend(k)
    return new ListComponentState(
      this.baseInit,
      items,
      this.lookUp.set(k, value)
    )
  }

  get(k: ListKey): Option<S> {
    return this.lookUp.get(k)
  }

  fold<T>(s: T, fn: (current: S, k: ListKey, acc: T) => T): T {
    return this.items.fold(s, (currentItem, accumulator) => {
      return fn(
        this.lookUp.get(currentItem).getOrElse(this.baseInit()),
        currentItem,
        accumulator
      )
    })
  }
}
