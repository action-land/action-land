interface INode<T> {
  value: T
  next: INode<T> | null
}

export class LinkedList<T> {
  private head: INode<T> | null = null

  private createNode(value: T): INode<T> {
    return {value, next: null}
  }
  private insertInFront(value: T): void {
    const node = this.createNode(value)
    node.next = this.head
    this.head = node
  }
  public concat(value: T | T[]): LinkedList<T> {
    if (!(value instanceof Array)) {
      this.insertInFront(value)
    }
    if (value instanceof Array) {
      value.forEach((val: T) => {
        this.insertInFront(val)
      })
    }
    return this
  }
  public getHead(): INode<T> | null {
    return this.head
  }
}
