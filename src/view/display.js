import React from 'react'
import PropTypes from 'prop-types'
import {Token} from './token'
import {lineStyle, displayStyle} from './style'

export function Display ({expression, result}) {
  let line = [].concat(expression)
  if (typeof result === 'number') {
    line.push('=', result)
  }

  const tokens = line.map((value, index) => <Token value={value} key={index} />)
  return (
    <div className={displayStyle}>
      <div className={lineStyle}>{tokens}</div>
    </div>
  )
}
Display.PropTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  result: PropTypes.number.isRequired
}
