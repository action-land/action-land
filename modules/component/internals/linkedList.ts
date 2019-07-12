interface INode<T> {
    value: T
    next: INode<T> | null
}

export class LinkedList<T> {
    private head: INode<T>| null = null

    private createNode (value: T): INode<T> {
        return { value, next: null }
    }

    public concat (value: T): LinkedList<T> {
        const node = this.createNode(value)
        node.next = this.head
        this.head = node
        return this
    }
    public getHead  (): INode<T>| null {
        return this.head
    }

}