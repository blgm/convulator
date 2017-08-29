import {createStore as createReduxStore, combineReducers} from 'redux'
import bindSelectors from 'redux-bind-selectors'
import {createSelector} from 'reselect'
import {evaluate, number, operator} from '../evaluator/evaluator.js'

function tokensReducer (tokensIn = [], action) {
  const tail = tokensIn[tokensIn.length - 1]
  const head = [...tokensIn.slice(0, tokensIn.length - 1)]
  let tokensOut = []

  switch (action.type) {
    case 'APPEND_NUMBER':
      if (tokensIn.length > 0 && tail.type === 'number') {
        // Append to existing number
        tokensOut = [...head, tail.append(action.value)]
      } else {
        tokensOut = [...tokensIn, number(action.value)]
      }
      break
    case 'APPEND_OPERATOR':
      if (tokensIn.length) { // Can't add operator as first token
        if (tail.type === 'number') {
          tokensOut = [...tokensIn, operator(action.value)]
        } else {
          // Replace existing operator
          tokensOut = [...head, operator(action.value)]
        }
      }
      break
    case 'CLEAR_DIGIT':
      if (tokensIn.length) {
        if (tail.type === 'operator') {
          tokensOut = head
        } else {
          const newNumber = tail.remove()
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
