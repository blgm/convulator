import React from 'react'
import PropTypes from 'prop-types'
import {Token} from './token'

export function Line ({expression, result}) {
  let line = [].concat(expression)
  if (typeof result === 'number') {
    line.push('=', result)
  }

  const tokens = line.map((value, index) => <Token value={value} key={index} />)
  return (
    <div className='display'>
      <div className='line'>{tokens}</div>
    </div>
  )
}
Line.PropTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  result: PropTypes.number.isRequired
}
