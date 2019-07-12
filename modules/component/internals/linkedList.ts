export abstract class LinkedList<A> {
  abstract readonly head: A
  abstract readonly tail: LinkedList<A>

  abstract isEmpty: boolean
  prepend(element: A): LinkedList<A> {
    return new Cons(element, this)
  }

  static get empty(): LinkedList<never> {
    return new Empty()
  }

  static of<T>(element: T): LinkedList<T> {
    return new Cons<T>(element, LinkedList.empty)
  }

  reduce<B>(seed: B, fn: (a: A, b: B) => B): B {
    let n: LinkedList<A> = this
    let r = seed
    while (!n.isEmpty) {
      r = fn(n.head, r)
      n = n.tail
    }
    return r
  }
}

class Empty extends LinkedList<never> {
  isEmpty = true
  get head(): never {
    throw new Error('Head of empty list')
  }
  get tail(): never {
    throw new Error('Tail of empty list')
  }
}

class Cons<A> extends LinkedList<A> {
  isEmpty = false
  constructor(readonly head: A, readonly tail: LinkedList<A>) {
    super()
  }
}
