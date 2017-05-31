import React from 'react'

export function Token ({value}) {
  return <div className={tokenClassName(value)}>{tokenValue(value)}</div>
}

function tokenClassName (value) {
  if (typeof value === 'number') {
    return 'number'
  } else if (value === '=') {
    return 'equals'
  } else if (value === 'C') {
    return 'clear'
  } else if (value === 'AC') {
    return 'clear'
  } else {
    return 'operator'
  }
}

function tokenValue (value) {
  if (typeof value === 'number') {
    return value
  } else {
    switch (value) {
      case '/':
        return '\u00F7'
      case '*':
        return 'x'
      default:
        return value
    }
  }
}
