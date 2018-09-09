import { LinkedList } from './linkedlist.js'
import Big from 'big.js'

const binary = {
  '+': {
    operation: (lhs, rhs) => lhs.plus(rhs),
    precedence: 1
  },
  '-': {
    operation: (lhs, rhs) => lhs.minus(rhs),
    precedence: 1
  },
  '*': {
    operation: (lhs, rhs) => lhs.times(rhs),
    precedence: 2
  },
  '/': {
    operation: (lhs, rhs) => lhs.div(rhs),
    precedence: 2
  }
}

function allowed (next, found) {
  if (!next.some(allowed => allowed === found)) {
    throw new Error(`Found ${found}, but expected one of: ` + next.join(' ,'))
  }
}

function number (token) {
  return { ...token, resolve: () => Big(token.value) }
}

function operator (token) {
  if (binary[token.value]) {
    return {
      ...token,
      precedence: binary[token.value].precedence,
      operation: binary[token.value].operation
    }
  } else {
    throw new Error('invalid operator: ' + token.value)
  }
}

function processAndValidate (tokens) {
  const operations = new LinkedList()
  let next = ['number', 'end']
  // Iterate through the expression
  tokens.forEach(token => {
    if (token.type === 'number') {
      allowed(next, 'number')
      next = ['operator', 'end']
      operations.add(number(token))
    } else if (token.type === 'operator') {
      allowed(next, 'operator')
      next = ['number']
      operations.add(operator(token))
    } else {
      throw new Error('invalid token: ' + token)
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
  if (Array.isArray(tokens) && tokens.length) {
    // Check syntactic validity of the expression
    // and convert the tokens into a flat list of operations
    const operations = processAndValidate(tokens)

    // Convert the flat list into a precedence oriented list
    const tree = computePrecedenceTree(operations)

    // By this stage, the tree should have a single root, which we resolve
    // to get the arithmetic answer
    return parseFloat(tree.head.value.resolve().toString())
  } else {
    return null
  }
}
