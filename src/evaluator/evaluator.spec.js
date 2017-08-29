/* eslint-env jest */

import evaluate from './evaluator.js'

describe('evaluator', () => {
  describe('invalid expressions', () => {
    it('throws an error on an invalid first token', () => {
      expect(() => {
        evaluate(['rubbish'])
      }).toThrowError('invalid operator: rubbish')
    })

    it('throws an error if the first token is an operator', () => {
      expect(() => {
        evaluate(['+', 4])
      }).toThrowError(/Found operator, but expected one of:/)
    })

    it('throws an error if the second token is a number', () => {
      expect(() => {
        evaluate([7, 4])
      }).toThrowError(/Found number, but expected one of:/)
    })

    it('throws an error if the end token is not a number', () => {
      expect(() => {
        evaluate([7, '+'])
      }).toThrowError(/Found end, but expected one of:/)
    })
  })

  describe('empty expressions', () => {
    it('returns null for an empty expression', () => {
      expect(evaluate([])).toBe(null)
    })
  })

  describe('evaluation of numerical literals', () => {
    it('evaluates zero', () => {
      expect(evaluate([0])).toBe(0)
    })

    it('evaluates unity', () => {
      expect(evaluate([1])).toBe(1)
    })

    it('evaluates a large number', () => {
      expect(evaluate([1e15])).toBe(1e15)
    })

    it('evaluates a negative number', () => {
      expect(evaluate([-256])).toBe(-256)
    })
  })

  describe('single binary operators', () => {
    describe('addition', () => {
      it('evaluates 1+1', () => {
        expect(evaluate([1, '+', 1])).toBe(2)
      })

      it('evalutes 6+24', () => {
        expect(evaluate([6, '+', 24])).toBe(30)
      })

      it('evalutes 6+-24', () => {
        expect(evaluate([6, '+', -24])).toBe(-18)
      })
    })

    describe('subtraction', () => {
      it('evaluates 1-1', () => {
        expect(evaluate([1, '-', 1])).toBe(0)
      })

      it('evalutes 24-6', () => {
        expect(evaluate([24, '-', 6])).toBe(18)
      })
    })

    describe('multiplication', () => {
      it('evaluates 1*1', () => {
        expect(evaluate([1, '*', 1])).toBe(1)
      })

      it('evaluates 8 * 16', () => {
        expect(evaluate([8, '*', 16])).toBe(128)
      })
    })

    describe('division', () => {
      it('evaluates 1/1', () => {
        expect(evaluate([1, '/', 1])).toBe(1)
      })

      it('evaluates 16 / 8', () => {
        expect(evaluate([16, '/', 8])).toBe(2)
      })
    })
  })

  describe('chained binary operators with same precedence', () => {
    it('chains addition/subtraction', () => {
      expect(evaluate([1, '+', 2, '-', 3, '+', 4, '-', 5])).toBe(-1)
    })

    it('chains multiplication/division', () => {
      expect(evaluate([1, '*', 2, '/', 3, '*', 4, '/', 4, '*', 3])).toBe(2)
    })
  })

  describe('chained binary operators with different precedence', () => {
    it('evaluates 1 + 2 * 3 correctly', () => {
      expect(evaluate([1, '+', 2, '*', 3])).toBe(7)
    })

    it('evaluates 16 / 4 + 3 * 2 - 1 correctly', () => {
      expect(evaluate([16, '/', 4, '+', 3, '*', 2, '-', 1])).toBe(9)
    })
  })
})
