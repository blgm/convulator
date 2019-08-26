import { createStore as createReduxStore, combineReducers, applyMiddleware, compose } from 'redux'
import bindSelectors from 'redux-bind-selectors'
import { createActions, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import evaluate from '../evaluator/evaluator.js'
import { appendDigit, operator, removeDigit } from '../evaluator/tokens'

// Log in Demo only (not production OR test)
const middleware = []
/* istanbul ignore if */
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  middleware.push(createLogger({ collapsed: true }))
}

export const actions = createActions(
  'appendNumber',
  'appendOperator',
  'clearDigit',
  'clearAll'
)

const last = list => list[list.length - 1]
const head = list => [...list.slice(0, list.length - 1)]

const tokensReducer = handleActions(
  {
    [actions.appendNumber]: (tokens, action) => {
      if (tokens.length > 0 && last(tokens).type === 'number') {
        // Append to existing number
        return [...head(tokens), appendDigit(last(tokens), action.payload)]
      } else {
        // Add a new number token
        return [...tokens, appendDigit(undefined, action.payload)]
      }
    },

    [actions.appendOperator]: (tokens, action) => {
      if (tokens.length) { // Can't add operator as first token
        if (last(tokens).type === 'number') {
          return [...tokens, operator(action.payload)]
        } else {
          // Replace existing operator
          return [...head(tokens), operator(action.payload)]
        }
      }
    },

    [actions.clearDigit]: (tokens, action) => {
      if (tokens.length) {
        if (last(tokens).type === 'operator') {
          return head(tokens)
        } else {
          const newNumber = removeDigit(last(tokens))
          if (newNumber) {
            return [...head(tokens), newNumber]
          } else {
            return head(tokens)
          }
        }
      }
    },

    [actions.clearAll]: () => []
  },
  []
)

const resultSelector = createSelector(
  state => state.tokens,
  tokens => {
    try {
      return evaluate(tokens)
    } catch (e) {
      return null
    }
  }
)

export function createStore () {
  return createReduxStore(
    combineReducers({ tokens: tokensReducer }),
    compose(
      applyMiddleware(...middleware),
      bindSelectors({ result: resultSelector })
    )
  )
}
