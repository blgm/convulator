import React from 'react'
import {style} from 'typestyle'

export function Token ({value}) {
  return <div className={tokenClassName(value)}>{tokenValue(value)}</div>
}

const commonStyle = {
  'font-size': '20px',
  'padding': '10px 16px',
  'margin': '2px',
  'border-radius': '25px',
  'text-align': 'center'
}

export const tokenStyle = {
  number: style(commonStyle, {background: 'paleturquoise'}),
  operator: style(commonStyle, {background: 'lightblue'}),
  equals: style(commonStyle, {background: 'palegreen'}),
  clear: style(commonStyle, {background: 'pink'})
}

function tokenClassName (value) {
  if (typeof value === 'number') {
    return tokenStyle.number
  } else if (value === '=') {
    return tokenStyle.equals
  } else if (value === 'C') {
    return tokenStyle.clear
  } else if (value === 'AC') {
    return tokenStyle.clear
  } else {
    return tokenStyle.operator
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
