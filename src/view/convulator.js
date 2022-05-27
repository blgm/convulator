import React from 'react'
import Buttons from './button.js'
import Expression from './expression.js'
import Result from './result.js'
import { displayStyle, dividerStyle } from './style.js'

export default function Convulator () {
  return (
    <div>
      <div className={displayStyle}>
        <Expression />
        <div className={dividerStyle} />
        <Result />
      </div>
      <Buttons />
    </div>
  )
}
