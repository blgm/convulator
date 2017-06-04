import {createStore} from 'redux'
import evaluate from '../evaluator/evaluator.js'

export function reducer (state, action) {
  if (typeof state === 'undefined') {
    state = {
      tokens: [],
      canAddOperator: false
    }
  }

  if (typeof action === 'object') {
    switch (action.type) {
      case 'APPEND_NUMBER':
        if (state.canAddOperator && state.tokens.length > 0) {
          // Append to existing number
          const existingNumber = state.tokens[state.tokens.length - 1]
          const newNumber = Number.parseInt(existingNumber.toString() + action.value.toString())
          state = {
            tokens: [...state.tokens.slice(0, state.tokens.length - 1), newNumber],
            canAddOperator: true
          }
        } else {
          state = {
            tokens: [...state.tokens, action.value],
            canAddOperator: true
          }
        }
        break
      case 'APPEND_OPERATOR':
        if (state.canAddOperator) {
          state = {
            tokens: [...state.tokens, action.value],
            canAddOperator: false
          }
        }
        break
      case 'CLEAR_DIGIT':
        if (state.tokens.length) {
          const tail = state.tokens[state.tokens.length - 1]
          if (typeof tail === 'string') {
            state = {
              tokens: [...state.tokens.slice(0, state.tokens.length - 1)],
              canAddOperator: true
            }
          } else if (tail.toString().length > 1) {
            const newNumber = Number.parseInt(tail.toString().slice(0, tail.toString().length - 1))
            state = {
              tokens: [...state.tokens.slice(0, state.tokens.length - 1), newNumber],
              canAddOperator: true
            }
          } else {
            state = {
              tokens: [...state.tokens.slice(0, state.tokens.length - 1)],
              canAddOperator: false
            }
          }
        }
        break
      case 'CLEAR_ALL':
        if (state.tokens.length) {
          state = {
            tokens: [],
            canAddOperator: false
          }
        }
        break
    }
  }

  try {
    state.result = evaluate(state.tokens)
  } catch (e) {
    state.result = null
  }

  return state
}

export const store = createStore(reducer)
