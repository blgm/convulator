import React from 'react'
import PropTypes from 'prop-types'
import {Number} from './number'
import {style} from 'typestyle'

export const resultStyle = style({
  display: 'flex',
  padding: '10px 20px',
  height: '45px'
})

export function Result ({result}) {
  return (
    <div className={resultStyle}>
      {typeof result !== 'number'
        ? null
        : <Number value={result} />
      }
    </div>
  )
}
Result.propTypes = {
  result: PropTypes.number
}
