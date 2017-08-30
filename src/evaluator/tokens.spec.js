/* eslint-env jest */

import * as tokens from './tokens'

describe('token helpers', () => {
  describe('operators', () => {
    it('can create an operator token', () => {
      const o = tokens.operator('+')
      expect(o.type).toBe('operator')
      expect(o.value).toBe('+')
    })

    it('does not validate the operator type', () => {
      const o = tokens.operator('foo') // Invalid!
      expect(o.type).toBe('operator')
      expect(o.value).toBe('foo')
    })
  })

  describe('appending to numbers', () => {
    it('creates a number when appending to `undefined`', () => {
      const n = tokens.appendDigit(undefined, 1)
      expect(n.type).toBe('number')
      expect(n.value).toBe('1') // String
    })

    it('appends to an existing number', () => {
      const i = tokens.appendDigit(undefined, 1)
      const n = tokens.appendDigit(i, 2)
      expect(n.type).toBe('number')
      expect(n.value).toBe('12') // String
    })

    it('can take a string', () => {
      const n = tokens.appendDigit(undefined, '4')
      expect(n.type).toBe('number')
      expect(n.value).toBe('4') // String
    })

    it('appends a string to an existing number', () => {
      const i = tokens.appendDigit(undefined, '8')
      const n = tokens.appendDigit(i, '1')
      expect(n.type).toBe('number')
      expect(n.value).toBe('81') // String
    })
  })

  describe('removing from numbers', () => {
    it('removes a digit from a multi-digit number', () => {
      const initial = {
        type: 'number',
        value: '123'
      }
      const n = tokens.removeDigit(initial)
      expect(n.type).toBe('number')
      expect(n.value).toBe('12')
    })

    it('returns undefined when there are no digits left', () => {
      const initial = {
        type: 'number',
        value: '5'
      }
      const n = tokens.removeDigit(initial)
      expect(n).toBeUndefined()
    })
  })
})
