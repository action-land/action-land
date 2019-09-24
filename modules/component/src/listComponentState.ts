import {Either, List} from 'standard-data-structures'

type ListKey = string | number

export class ListComponentState<S> {
  private constructor(
    private baseInit: () => S,
    private readonly items: List<ListKey>,
    private readonly lookUp: {[k in ListKey]?: S}
  ) {}
  static of<T>(baseInit: () => T) {
    return new ListComponentState(baseInit, List.empty(), {})
  }
  set(k: ListKey, value: S = this.baseInit()) {
    const itemState = this.lookUp[k]
    if (itemState !== undefined) {
      return new ListComponentState(this.baseInit, this.items, {
        ...this.lookUp,
        [k]: value
      })
    }
    const items = this.items.prepend(k)
    return new ListComponentState(this.baseInit, items, {
      ...this.lookUp,
      [k]: value
    })
  }

  get(k: ListKey): Either<null, S> {
    const node = this.lookUp[k]
    return node !== undefined ? Either.right(node) : Either.left(null)
  }

  fold<T>(s: T, fn: (current: S, k: ListKey, acc: T) => T): T {
    return this.items.fold(s, (currentItem, accumulator) => {
      const currentState = this.lookUp[currentItem]
      return fn(
        currentState !== undefined ? currentState : this.baseInit(),
        currentItem,
        accumulator
      )
    })
  }
}
