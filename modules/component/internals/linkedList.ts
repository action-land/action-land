/**
 * Immutable linked list data structure implementation
 */
export abstract class LinkedList<A> {
  abstract readonly head: A
  abstract readonly tail: LinkedList<A>

  abstract isEmpty: boolean
  /**
   * Prepends node to the linked list
   * @param element Node to be added
   */
  prepend(element: A): LinkedList<A> {
    return new Cons(element, this)
  }

  static get empty(): LinkedList<never> {
    return new Empty()
  }
  /**
   * Lifts an element as node in a linked list
   * @param element Element to be lifted as node in linked list
   */
  static of<T>(element: T): LinkedList<T> {
    return new Cons<T>(element, LinkedList.empty)
  }

  /**
   * Execute a fn on each element of the list, resulting in a single output value.
   * @param seed A value to use as the second argument to the first call of the fn.
   * @param fn Take two arguments currentValue and accumulator
   */
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

/**
 * Empty linked list
 */
class Empty extends LinkedList<never> {
  isEmpty = true
  get head(): never {
    throw new Error('Head of empty list')
  }
  get tail(): never {
    throw new Error('Tail of empty list')
  }
}
/**
 * Not empty linked list implementation
 */
class Cons<A> extends LinkedList<A> {
  isEmpty = false
  constructor(readonly head: A, readonly tail: LinkedList<A>) {
    super()
  }
}
