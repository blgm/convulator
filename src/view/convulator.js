import React from 'react'
import Buttons from './button'
import Expression from './expression'
import Result from './result'
import {displayStyle, dividerStyle} from './style'

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
