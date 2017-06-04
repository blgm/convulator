import React from 'react'
import {Buttons} from './button'
import {Display} from './display'

export function Convulator ({state, dispatcher}) {
  return (
    <div>
      <Display expression={state.tokens} result={state.result} />
      <Buttons dispatcher={dispatcher} />
    </div>
  )
}
