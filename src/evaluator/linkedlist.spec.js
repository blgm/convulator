/* eslint-env jest */

import { LinkedList } from './linkedlist.js'
const ll = () => new LinkedList()

describe('LinkedList', () => {
  describe('for an empty list', () => {
    it('has an undefined head', () => {
      expect(ll().head).toBe(undefined)
    })

    it('has an undefined tail', () => {
      expect(ll().tail).toBe(undefined)
    })
  })

  describe('for a list with one element', () => {
    it('has a head node with a value() method', () => {
      expect(ll().add(13).head.value).toBe(13)
    })

    it('has a head node with no next node', () => {
      expect(ll().add(2).head.next).toBe(undefined)
    })

    it('has a head node with no previous node', () => {
      expect(ll().add(2).head.previous).toBe(undefined)
    })

    it('has a tail node with a value() method', () => {
      expect(ll().add(3).tail.value).toBe(3)
    })

    it('has a tail node with no next node', () => {
      expect(ll().add(2).tail.next).toBe(undefined)
    })

    it('has a tail node with no previous node', () => {
      expect(ll().add(2).tail.previous).toBe(undefined)
    })
  })

  describe('for a list with more than one element', () => {
    it('has a head node with a value() method', () => {
      expect(ll().add(13).add(34).head.value).toBe(13)
    })

    it('has a head node with link to a next node', () => {
      expect(ll().add(2).add(45).head.next.value).toBe(45)
    })

    it('has a head node with no previous node', () => {
      expect(ll().add(2).add(7).head.previous).toBe(undefined)
    })

    it('has a tail node with a value() method', () => {
      expect(ll().add(3).add(8).tail.value).toBe(8)
    })

    it('has a tail node with no next node', () => {
      expect(ll().add(6).add(4).tail.next).toBe(undefined)
    })

    it('has a tail node with a link to a previous node', () => {
      expect(ll().add(2).add(1).tail.next).toBe(undefined)
    })

    it('supports forward iteration of lists', () => {
      const list = ll()
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      numbers.forEach(number => list.add(number))

      let result = []
      for (let n = list.head; typeof n !== 'undefined'; n = n.next) {
        result.push(n.value)
      }

      expect(result).toEqual(numbers)
    })

    it('supports backwards iteration of lists', () => {
      const list = ll()
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      numbers.forEach(number => list.add(number))

      let result = []
      for (let n = list.tail; typeof n !== 'undefined'; n = n.previous) {
        result.push(n.value)
      }
      result.reverse()

      expect(result).toEqual(numbers)
    })
  })

  describe('removal of nodes', () => {
    describe('for a list of length one', () => {
      it('results in an empty list', () => {
        const list = ll().add(33)
        expect(list.head).toBe(list.tail) // Just checking...
        list.remove(list.head)
        expect(list.head).toBe(undefined)
        expect(list.tail).toBe(undefined)
      })
    })

    describe('for a list longer than one', () => {
      it('can remove the head', () => {
        const list = ll().add(3).add(8)
        list.remove(list.head)
        expect(list.head).toBe(list.tail)
        expect(list.head.value).toBe(8)
        expect(list.head.next).toBe(undefined)
        expect(list.head.previous).toBe(undefined)
      })

      it('can remove the tail', () => {
        const list = ll().add(3).add(8)
        list.remove(list.tail)
        expect(list.head).toBe(list.tail)
        expect(list.head.value).toBe(3)
        expect(list.head.next).toBe(undefined)
        expect(list.head.previous).toBe(undefined)
      })

      it('can remove a node in the middle', () => {
        const list = ll().add(1).add(2).add(3)
        list.remove(list.head.next)
        expect(list.head.value).toBe(1)
        expect(list.tail.value).toBe(3)
        expect(list.head.next).toBe(list.tail)
      })

      it('can iterate while removing elements', () => {
        const list = ll()
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        numbers.forEach(number => list.add(number))

        for (let n = list.head; typeof n !== 'undefined'; n = n.next) {
          if (n.value % 2 === 0) {
            list.remove(n)
          }
        }

        let result = []
        for (let n = list.tail; typeof n !== 'undefined'; n = n.previous) {
          result.push(n.value)
        }

        expect(result).toEqual([9, 7, 5, 3, 1])
      })
    })
  })
})
