export class ListComponentState<S> {
  private constructor(
    private baseInit: () => S,
    /**
     * @todo
     * Figure out better data structure here
     */
    private items: S[] = [],
    private lookUp: {[k in string]?: number} = {}
  ) {}
  fold<T>(s: T, fn: (acc: T, current: S) => T): T {
    if (this.items.length === 0) {
      return s
    } else {
      let calc: T = fn(s, this.items[0])
      this.items.forEach((item, i) => {
        if (i > 0) {
          calc = fn(calc, item)
        }
      })
      return calc
    }
  }
  static of<T>(baseInit: () => T) {
    return new ListComponentState(baseInit)
  }
  getItem(k: string) {
    const index = this.lookUp[k]
    return this.items[index !== undefined ? (index as number) : 0]
  }
  update<T extends S>(fn: (a: S) => T, k: string) {
    if (this.lookUp[k] === undefined) {
      const items = [...this.items, fn(this.baseInit())]
      const lookUp = {
        ...this.lookUp,
        [k]: items.length - 1
      }
      return new ListComponentState(this.baseInit, items, lookUp)
    } else {
      const items = Array.from(this.items)
      items[this.lookUp[k] as number] = fn(items[this.lookUp[k] as number])
      return new ListComponentState(this.baseInit, items, this.lookUp)
    }
  }
  getItems() {
    return this.items
  }
}
