import {createStore as createReduxStore, combineReducers} from 'redux'
import bindSelectors from 'redux-bind-selectors'
import {createSelector} from 'reselect'
import evaluate from '../evaluator/evaluator.js'
import * as tokens from '../evaluator/tokens'

function tokensReducer (tokensIn = [], action) {
  const tail = tokensIn[tokensIn.length - 1]
  const head = [...tokensIn.slice(0, tokensIn.length - 1)]
  let tokensOut = []

  switch (action.type) {
    case 'APPEND_NUMBER':
      if (tokensIn.length > 0 && tail.type === 'number') {
        // Append to existing number
        tokensOut = [...head, tokens.appendDigit(tail, action.value)]
      } else {
        // Add a new number token
        tokensOut = [...tokensIn, tokens.appendDigit(undefined, action.value)]
      }
      break
    case 'APPEND_OPERATOR':
      if (tokensIn.length) { // Can't add operator as first token
        if (tail.type === 'number') {
          tokensOut = [...tokensIn, tokens.operator(action.value)]
        } else {
          // Replace existing operator
          tokensOut = [...head, tokens.operator(action.value)]
        }
      }
      break
    case 'CLEAR_DIGIT':
      if (tokensIn.length) {
        if (tail.type === 'operator') {
          tokensOut = head
        } else {
          const newNumber = tokens.removeDigit(tail)
          if (newNumber) {
            tokensOut = [...head, newNumber]
          } else {
            tokensOut = head
          }
        }
      }
      break
    case 'CLEAR_ALL':
      if (tokensIn.length) {
        tokensOut = []
      }
      break
  }

  return tokensOut
}

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
    combineReducers({tokens: tokensReducer}),
    bindSelectors({result: resultSelector})
  )
}
