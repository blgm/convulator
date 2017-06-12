import React from 'react'
import {numberStyle, operatorStyle, equalsStyle, clearStyle} from './style'
export function Token ({value}) {
  return <div className={tokenClassName(value)}>{tokenValue(value)}</div>
}

function tokenClassName (value) {
  if (typeof value === 'number') {
    return numberStyle
  } else if (value === '=') {
    return equalsStyle
  } else if (value === 'C') {
    return clearStyle
  } else if (value === 'AC') {
    return clearStyle
  } else {
    return operatorStyle
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
