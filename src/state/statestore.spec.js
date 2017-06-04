/* eslint-env jest */

import {reducer, store} from './statestore.js'

describe('reducer', () => {
  describe('initialisation', () => {
    it('initialisaes with an empty token list', () => {
      expect(reducer().tokens).toEqual([])
    })

    it('initialises with the `canAddOperator` property set to false', () => {
      expect(reducer().canAddOperator).toBe(false)
    })

    it('initialises with a null result', () => {
      expect(reducer().result).toBe(null)
    })
  })

  describe('number as action', () => {
    const action = {
      type: 'APPEND_NUMBER',
      value: 0
    }

    describe('when the token list is empty', () => {
      it('sets the `canAddOperator` property to true', () => {
        expect(reducer(undefined, action).canAddOperator).toBe(true)
      })

      it('adds the number to the token list', () => {
        expect(reducer(undefined, action).tokens).toEqual([0])
      })
    })

    describe('when the token list is terminated by a number', () => {
      const start = reducer(undefined, {
        type: 'APPEND_NUMBER',
        value: 1
      })

      it('sets the `canAddOperator` property to true', () => {
        expect(reducer(start, action).canAddOperator).toBe(true)
      })

      it('appends the number to the existing number', () => {
        expect(reducer(start, action).tokens).toEqual([10])
      })
    })

    describe('when the token list is terminated by an operator', () => {
      const first = reducer(undefined, {
        type: 'APPEND_NUMBER',
        value: 0
      })
      const second = reducer(first, {
        type: 'APPEND_OPERATOR',
        value: '+'
      })

      it('sets the `canAddOperator` property to true', () => {
        expect(reducer(second, action).canAddOperator).toBe(true)
      })

      it('adds the number to the token list', () => {
        expect(reducer(second, action).tokens).toEqual([0, '+', 0])
      })
    })
  })

  describe('operator as action', () => {
    const action = {
      type: 'APPEND_OPERATOR',
      value: '+'
    }

    describe('when the token list is empty', () => {
      it('does not add the operator to the token list', () => {
        expect(reducer(undefined, action).tokens).toEqual([])
      })
    })

    describe('when the token list already has a number', () => {
      const start = reducer(undefined, {
        type: 'APPEND_NUMBER',
        value: 0
      })

      it('sets the `canAddOperator` property to false', () => {
        expect(reducer(start, action).canAddOperator).toBe(false)
      })

      it('adds the operator to the token list', () => {
        expect(reducer(start, action).tokens).toEqual([0, '+'])
      })
    })

    describe('when the token list is terminate by an operator', () => {
      const first = reducer(undefined, {
        type: 'APPEND_NUMBER',
        value: 0
      })
      const second = reducer(first, {
        type: 'APPEND_OPERATOR',
        value: '+'
      })

      it('does not add the operator to the token list', () => {
        expect(reducer(second, action).tokens).toEqual([0, '+'])
      })
    })
  })

  describe('delete digit', () => {
    const del = {type: 'CLEAR_DIGIT'}

    it('does nothing when the store is empty', () => {
      const state = reducer(undefined, del)
      expect(state.tokens).toEqual([])
      expect(state.canAddOperator).toBeFalsy()
    })

    it('will remove a single number', () => {
      const first = reducer(undefined, {type: 'APPEND_NUMBER', value: 1})
      const state = reducer(first, del)
      expect(state.tokens).toEqual([])
      expect(state.canAddOperator).toBeFalsy()
    })

    it('will remove the last digit of a number', () => {
      const first = reducer(undefined, {type: 'APPEND_NUMBER', value: 2})
      const second = reducer(first, {type: 'APPEND_NUMBER', value: 3})
      const state = reducer(second, del)
      expect(state.tokens).toEqual([2])
      expect(state.canAddOperator).toBeTruthy()
    })

    it('will remove an operator', () => {
      const first = reducer(undefined, {type: 'APPEND_NUMBER', value: 4})
      const second = reducer(first, {type: 'APPEND_OPERATOR', value: '+'})
      const state = reducer(second, del)
      expect(state.tokens).toEqual([4])
      expect(state.canAddOperator).toBeTruthy()
    })
  })

  describe('delete all', () => {
    const del = {type: 'CLEAR_ALL'}

    it('does nothing when the store is empty', () => {
      const state = reducer(undefined, del)
      expect(state.tokens).toEqual([])
      expect(state.canAddOperator).toBeFalsy()
    })

    it('will remove all digits', () => {
      const first = reducer(undefined, {type: 'APPEND_NUMBER', value: 2})
      const second = reducer(first, {type: 'APPEND_NUMBER', value: 3})
      const state = reducer(second, del)
      expect(state.tokens).toEqual([])
      expect(state.canAddOperator).toBeFalsy()
    })
  })
})

describe('store', () => {
  it('returns the initial state', () => {
    expect(store.getState()).toEqual({
      tokens: [],
      canAddOperator: false,
      result: null
    })
  })

  it('processes a first action', () => {
    store.dispatch({
      type: 'APPEND_NUMBER',
      value: 2
    })
    expect(store.getState()).toEqual({
      tokens: [2],
      canAddOperator: true,
      result: 2
    })
  })
})
