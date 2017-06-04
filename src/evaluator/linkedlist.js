// Minimalistic linked list

export class LinkedList {
  add (value) {
    const node = new LinkedListNode(value, this._tail)

    if (typeof this._head === 'undefined') {
      this._head = node
      this._tail = node
    } else {
      this._tail.next = node
      this._tail = node
    }

    return this
  }

  remove (node) {
    if (node === this._head && node === this._tail) {
      this._head = this._tail = undefined
    } else if (node === this._head) {
      this._head = this._head.next
      this._head.previous = undefined
    } else if (node === this._tail) {
      this._tail = this._tail.previous
      this._tail.next = undefined
    } else {
      node.next.previous = node.previous
      node.previous.next = node.next
    }
  }

  get head () {
    return this._head
  }

  get tail () {
    return this._tail
  }
}

class LinkedListNode {
  constructor (value, previous) {
    this.value = value
    this.previous = previous
  }
}
