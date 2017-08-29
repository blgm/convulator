'use strict'

import {LinkedList} from './linkedlist.js'

const binary = {
  '+': {
    operation: (lhs, rhs) => lhs + rhs,
    precedence: 1
  },
  '-': {
    operation: (lhs, rhs) => lhs - rhs,
    precedence: 1
  },
  '*': {
    operation: (lhs, rhs) => lhs * rhs,
    precedence: 2
  },
  '/': {
    operation: (lhs, rhs) => lhs / rhs,
    precedence: 2
  }
}

function allowed (next, found) {
  if (!next.some(allowed => allowed === found)) {
    throw new Error(`Found ${found}, but expected one of: ` + next.join(' ,'))
  }
}

function num (value) {
  return {
    type: 'number',
    value: value
  }
}

function op (value) {
  return {
    type: 'operator',
    value: value
  }
}

function identifyTokens (tokens) {
  return tokens.map(input => (
    typeof input === 'number'
      ? num(input)
      : op(input)
  ))
}

function identifyOperations (tokens) {
  let next = ['number', 'end']
  // Convert the tokens into a list of operations to be performed
  const operations = new LinkedList()
  tokens.forEach(token => {
    if (token.type === 'number') {
      allowed(next, 'number')
      next = ['operator', 'end']

      operations.add({
        type: 'literal',
        value: token.value,
        resolve: () => token.value
      })
    } else if (token.type === 'operator' && binary[token.value]) {
      allowed(next, 'operator')
      next = ['number']

      operations.add({
        type: 'binary',
        value: token.value,
        precedence: binary[token.value].precedence,
        operation: binary[token.value].operation
      })
    } else {
      throw new Error('invalid token: ' + token.value)
    }
  })

  allowed(next, 'end')

  return operations
}

// Mutates the operations list into a tree
function computePrecedenceTree (operations) {
  // Iterate from high precedence to low
  for (let p = 2; p > 0; p--) {
    // Iterate through each node in the list
    for (let n = operations.head; typeof n !== 'undefined'; n = n.next) {
      if (typeof n.value.precedence === 'number' && n.value.precedence === p) {
        const previous = n.previous
        const next = n.next
        const resolve = () => n.value.operation(previous.value.resolve(), next.value.resolve())
        operations.remove(previous)
        operations.remove(next)
        n.value.lhs = previous.value
        n.value.rhs = next.value
        n.value.resolve = resolve
      }
    }
  }

  return operations
}

export default function evaluate (tokens) {
  if (tokens.length) {
    const tokenObjs = identifyTokens(tokens)
    // Convert the tokens into a flat list of operations
    const operations = identifyOperations(tokenObjs)

    // Convert the flat list into a precedence oriented list
    const tree = computePrecedenceTree(operations)

    // By this stage, the tree should have a single root, which we resolve
    // to get the arithmetic answer
    return tree.head.value.resolve()
  } else {
    return null
  }
}
