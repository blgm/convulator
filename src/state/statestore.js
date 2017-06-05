import {createStore} from 'redux'
import evaluate from '../evaluator/evaluator.js'

export function reducer (stateIn, action) {
  const tokensIn = (typeof stateIn === 'undefined') ? [] : stateIn.tokens
  const tail = tokensIn[tokensIn.length - 1]
  const tailType = typeof tail
  let tokensOut = []

  if (typeof action === 'object') {
    switch (action.type) {
      case 'APPEND_NUMBER':
        if (tokensIn.length > 0 && tailType === 'number') {
          // Append to existing number
          const newNumber = Number.parseInt(tail.toString() + action.value.toString())
          tokensOut = [...tokensIn.slice(0, tokensIn.length - 1), newNumber]
        } else {
          tokensOut = [...tokensIn, action.value]
        }
        break
      case 'APPEND_OPERATOR':
        if (tokensIn.length) { // Can't add operator as first token
          if (tailType === 'number') {
            tokensOut = [...tokensIn, action.value]
          } else {
            // Replace existing operator
            tokensOut = [...tokensIn.slice(0, tokensIn.length - 1), action.value]
          }
        }
        break
      case 'CLEAR_DIGIT':
        if (tokensIn.length) {
          if (tailType === 'string') {
            tokensOut = [...tokensIn.slice(0, tokensIn.length - 1)]
          } else if (tail.toString().length > 1) {
            const newNumber = Number.parseInt(tail.toString().slice(0, tail.toString().length - 1))
            tokensOut = [...tokensIn.slice(0, tokensIn.length - 1), newNumber]
          } else {
            tokensOut = [...tokensIn.slice(0, tokensIn.length - 1)]
          }
        }
        break
      case 'CLEAR_ALL':
        if (tokensIn.length) {
          tokensOut = []
        }
        break
    }
  }

  let stateOut = {tokens: tokensOut}

  try {
    stateOut.result = evaluate(tokensOut)
  } catch (e) {
    stateOut.result = null
  }

  return stateOut
}

export const store = createStore(reducer)
