/* eslint-env jest */

import {createStore, actions} from './store.js'

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
    const action = actions.appendNumber(0)

    describe('when the token list is empty', () => {
      it('adds the number to the token list', () => {
        store.dispatch(action)
        const result = store.getState().tokens[0]
        expect(result.type).toBe('number')
        expect(result.value).toBe('0')
      })
    })

    describe('when the token list is terminated by a number', () => {
      const start = actions.appendNumber(1)

      it('appends the number to the existing number', () => {
        store.dispatch(start)
        store.dispatch(action)
        const token = store.getState().tokens[0]
        expect(token.type).toBe('number')
        expect(token.value).toBe('10')
      })
    })

    describe('when the token list is terminated by an operator', () => {
      const first = actions.appendNumber(0)
      const second = actions.appendOperator('+')

      it('adds the number to the token list', () => {
        store.dispatch(first)
        store.dispatch(second)
        store.dispatch(first)
        const tokens = store.getState().tokens
        expect(tokens[0].type).toBe('number')
        expect(tokens[0].value).toBe('0')
        expect(tokens[1].type).toBe('operator')
        expect(tokens[2].type).toBe('number')
        expect(tokens[2].value).toBe('0')
      })
    })
  })

  describe('operator as action', () => {
    const action = actions.appendOperator('+')

    describe('when the token list is empty', () => {
      it('does not add the operator to the token list', () => {
        store.dispatch(action)
        const tokens = store.getState().tokens
        expect(tokens).toEqual([])
      })
    })

    describe('when the token list already has a number', () => {
      const start = actions.appendNumber(0)

      it('adds the operator to the token list', () => {
        store.dispatch(start)
        store.dispatch(action)
        const tokens = store.getState().tokens
        expect(tokens).toHaveLength(2)
        expect(tokens[1].type).toBe('operator')
      })
    })

    describe('when the token list is terminated by an operator', () => {
      const first = actions.appendNumber(0)
      const second = actions.appendOperator('+')

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
    const del = actions.clearDigit()

    it('does nothing when the store is empty', () => {
      store.dispatch(del)
      const tokens = store.getState().tokens
      expect(tokens).toHaveLength(0)
    })

    it('will remove a single number', () => {
      store.dispatch(actions.appendNumber(1))
      store.dispatch(del)
      const tokens = store.getState().tokens
      expect(tokens).toHaveLength(0)
    })

    it('will remove the last digit of a number', () => {
      store.dispatch(actions.appendNumber(2))
      store.dispatch(actions.appendNumber(3))
      store.dispatch(del)
      const state = store.getState()
      expect(state.tokens[0].value).toBe('2')
    })

    it('will remove an operator', () => {
      store.dispatch(actions.appendNumber(4))
      store.dispatch(actions.appendOperator('+'))
      store.dispatch(del)
      const state = store.getState()
      expect(state.tokens).toHaveLength(1)
    })
  })

  describe('delete all', () => {
    const del = actions.clearAll()

    it('does nothing when the store is empty', () => {
      store.dispatch(del)
      const tokens = store.getState().tokens
      expect(tokens).toHaveLength(0)
    })

    it('will remove all digits', () => {
      store.dispatch(actions.appendNumber(2))
      store.dispatch(actions.appendNumber(3))
      store.dispatch(del)
      const tokens = store.getState().tokens
      expect(tokens).toHaveLength(0)
    })
  })
})
