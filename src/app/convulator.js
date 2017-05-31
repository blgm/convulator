import React from 'react'
import {Buttons} from './button'
import {Line} from './line'

export function Convulator ({state, dispatcher}) {
  return (
    <div>
      <Line expression={state.tokens} result={state.result} />
      <Buttons dispatcher={dispatcher} />
    </div>
  )
}
