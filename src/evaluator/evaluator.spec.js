/* eslint-env jest */

import evaluate from '../evaluator/evaluator.js'

const number = value => {
  return {
    type: 'number',
    value: value.toString()
  }
}

const operator = value => {
  return {
    type: 'operator',
    value
  }
}

describe('evaluator', () => {
  describe('invalid expressions', () => {
    it('throws an error on an invalid first token', () => {
      expect(() => {
        evaluate(['rubbish'])
      }).toThrowError('invalid token: rubbish')
    })

    it('throws an error if the first token is an operator', () => {
      expect(() => {
        evaluate([
          operator('+'),
          number(4)
        ])
      }).toThrowError(/Found operator, but expected one of:/)
    })

    it('throws an error if the second token is a number', () => {
      expect(() => {
        evaluate([
          number(7),
          number(4)
        ])
      }).toThrowError(/Found number, but expected one of:/)
    })

    it('throws an error if the end token is not a number', () => {
      expect(() => {
        evaluate([
          number(7),
          operator('+')
        ])
      }).toThrowError(/Found end, but expected one of:/)
    })

    it('throws an error for an unknown operator', () => {
      expect(() => {
        evaluate([
          number(7),
          operator('&')
        ])
      }).toThrowError(/invalid operator: &/)
    })
  })

  describe('empty expressions', () => {
    it('returns null for an empty expression', () => {
      expect(evaluate([])).toBe(null)
    })
  })

  describe('evaluation of numerical literals', () => {
    it('evaluates zero', () => {
      expect(evaluate([number(0)])).toBe(0)
    })

    it('evaluates unity', () => {
      expect(evaluate([number(1)])).toBe(1)
    })

    it('evaluates a large number', () => {
      expect(evaluate([number(1e15)])).toBe(1e15)
    })

    it('evaluates a negative number', () => {
      expect(evaluate([number(-256)])).toBe(-256)
    })
  })

  describe('single binary operators', () => {
    describe('addition', () => {
      it('evaluates 1+1', () => {
        expect(evaluate([
          number(1),
          operator('+'),
          number(1)
        ])).toBe(2)
      })

      it('evalutes 6+24', () => {
        expect(evaluate([
          number(6),
          operator('+'),
          number(24)
        ])).toBe(30)
      })

      it('evalutes 6+-24', () => {
        expect(evaluate([
          number(6),
          operator('+'),
          number(-24)
        ])).toBe(-18)
      })
    })

    describe('subtraction', () => {
      it('evaluates 1-1', () => {
        expect(evaluate([
          number(1),
          operator('-'),
          number(1)
        ])).toBe(0)
      })

      it('evalutes 24-6', () => {
        expect(evaluate([
          number(24),
          operator('-'),
          number(6)
        ])).toBe(18)
      })
    })

    describe('multiplication', () => {
      it('evaluates 1*1', () => {
        expect(evaluate([
          number(1),
          operator('*'),
          number(1)
        ])).toBe(1)
      })

      it('evaluates 8 * 16', () => {
        expect(evaluate([
          number(8),
          operator('*'),
          number(16)
        ])).toBe(128)
      })
    })

    describe('division', () => {
      it('evaluates 1/1', () => {
        expect(evaluate([
          number(1),
          operator('/'),
          number(1)
        ])).toBe(1)
      })

      it('evaluates 16 / 8', () => {
        expect(evaluate([
          number(16),
          operator('/'),
          number(8)])).toBe(2)
      })
    })
  })

  describe('chained binary operators with same precedence', () => {
    it('chains addition/subtraction', () => {
      expect(evaluate([
        number(1),
        operator('+'),
        number(2),
        operator('-'),
        number(3),
        operator('+'),
        number(4),
        operator('-'), number(5)
      ])).toBe(-1)
    })

    it('chains multiplication/division', () => {
      expect(evaluate([
        number(1),
        operator('*'),
        number(2),
        operator('/'),
        number(3),
        operator('*'),
        number(4),
        operator('/'),
        number(4),
        operator('*'),
        number(3)
      ])).toBe(2)
    })
  })

  describe('chained binary operators with different precedence', () => {
    it('evaluates 1 + 2 * 3 correctly', () => {
      expect(evaluate([
        number(1),
        operator('+'),
        number(2),
        operator('*'),
        number(3)
      ])).toBe(7)
    })

    it('evaluates 16 / 4 + 3 * 2 - 1 correctly', () => {
      expect(evaluate([
        number(16),
        operator('/'),
        number(4),
        operator('+'),
        number(3),
        operator('*'),
        number(2),
        operator('-'),
        number(1)
      ])).toBe(9)
    })
  })
})
