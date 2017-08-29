import {createStore as createReduxStore} from 'redux'
import {evaluate, number, operator} from '../evaluator/evaluator.js'

function reducer (stateIn, action) {
  const tokensIn = (typeof stateIn === 'undefined') ? [] : stateIn.tokens
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

  let stateOut = {tokens: tokensOut}

  try {
    stateOut.result = evaluate(tokensOut)
  } catch (e) {
    stateOut.result = null
  }

  return stateOut
}

export function createStore () {
  return createReduxStore(reducer)
}
