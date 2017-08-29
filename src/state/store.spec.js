/* eslint-env jest */

import {createStore} from './store.js'

describe('store', () => {
  let store
  beforeEach(() => (store = createStore()))

  describe('initialisation', () => {
    it('initialisaes with an empty token list', () => {
      const state = store.getState()
      expect(state.tokens).toEqual([])
    })

    it('initialises with a null result', () => {
      const state = store.getState()
      expect(state.result).toBe(null)
    })
  })

  describe('number as action', () => {
    const action = {
      type: 'APPEND_NUMBER',
      value: 0
    }

    describe('when the token list is empty', () => {
      it('adds the number to the token list', () => {
        store.dispatch(action)
        const result = store.getState().tokens[0]
        expect(result.type).toBe('number')
        expect(result.resolve().toString()).toBe('0')
      })
    })

    describe('when the token list is terminated by a number', () => {
      const start = {
        type: 'APPEND_NUMBER',
        value: 1
      }

      it('appends the number to the existing number', () => {
        store.dispatch(start)
        store.dispatch(action)
        const token = store.getState().tokens[0]
        expect(token.type).toBe('number')
        expect(token.resolve().toString()).toBe('10')
      })
    })

    describe('when the token list is terminated by an operator', () => {
      const first = {
        type: 'APPEND_NUMBER',
        value: 0
      }
      const second = {
        type: 'APPEND_OPERATOR',
        value: '+'
      }

      it('adds the number to the token list', () => {
        store.dispatch(first)
        store.dispatch(second)
        store.dispatch(first)
        const tokens = store.getState().tokens
        expect(tokens[0].type).toBe('number')
        expect(tokens[0].resolve().toString()).toBe('0')
        expect(tokens[1].type).toBe('operator')
        expect(tokens[2].type).toBe('number')
        expect(tokens[2].resolve().toString()).toBe('0')
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
        store.dispatch(action)
        const tokens = store.getState().tokens
        expect(tokens).toEqual([])
      })
    })

    describe('when the token list already has a number', () => {
      const start = {
        type: 'APPEND_NUMBER',
        value: 0
      }

      it('adds the operator to the token list', () => {
        store.dispatch(start)
        store.dispatch(action)
        const tokens = store.getState().tokens
        expect(tokens).toHaveLength(2)
        expect(tokens[1].type).toBe('operator')
      })
    })

    describe('when the token list is terminated by an operator', () => {
      const first = {
        type: 'APPEND_NUMBER',
        value: 0
      }
      const second = {
        type: 'APPEND_OPERATOR',
        value: '+'
      }

      it('does not add the operator to the token list', () => {
        store.dispatch(first)
        store.dispatch(second)
        store.dispatch(action)
        const tokens = store.getState().tokens
        expect(tokens).toHaveLength(2)
      })
    })
  })

  describe('delete digit', () => {
    const del = {type: 'CLEAR_DIGIT'}

    it('does nothing when the store is empty', () => {
      store.dispatch(del)
      const tokens = store.getState().tokens
      expect(tokens).toHaveLength(0)
    })

    it('will remove a single number', () => {
      store.dispatch({type: 'APPEND_NUMBER', value: 1})
      store.dispatch(del)
      const tokens = store.getState().tokens
      expect(tokens).toHaveLength(0)
    })

    it('will remove the last digit of a number', () => {
      store.dispatch({type: 'APPEND_NUMBER', value: 2})
      store.dispatch({type: 'APPEND_NUMBER', value: 3})
      store.dispatch(del)
      const state = store.getState()
      expect(state.tokens[0].resolve().toString()).toBe('2')
    })

    it('will remove an operator', () => {
      store.dispatch({type: 'APPEND_NUMBER', value: 4})
      store.dispatch({type: 'APPEND_OPERATOR', value: '+'})
      store.dispatch(del)
      const state = store.getState()
      expect(state.tokens).toHaveLength(1)
    })
  })

  describe('delete all', () => {
    const del = {type: 'CLEAR_ALL'}

    it('does nothing when the store is empty', () => {
      store.dispatch(del)
      const tokens = store.getState().tokens
      expect(tokens).toHaveLength(0)
    })

    it('will remove all digits', () => {
      store.dispatch({type: 'APPEND_NUMBER', value: 2})
      store.dispatch({type: 'APPEND_NUMBER', value: 3})
      store.dispatch(del)
      const tokens = store.getState().tokens
      expect(tokens).toHaveLength(0)
    })
  })
})
