import React from 'react'
import {Buttons} from './button'
import {cssRule} from 'typestyle'
import {Expression} from './expression'
import {Result} from './result'
import {displayStyle, dividerStyle} from './style'

export function Convulator ({state, dispatcher}) {
  setupPage()

  return (
    <div>
      <div className={displayStyle}>
        <Expression expression={state.tokens} />
        <div className={dividerStyle} />
        <Result result={state.result} />
      </div>
      <Buttons dispatcher={dispatcher} />
    </div>
  )
}

function setupPage () {
  // Some style for the staic html page
  cssRule('body', {
    background: 'white',
    fontFamily: 'Arial',
    display: 'flex',
    justifyContent: 'center'
  })

  cssRule('.page', {
    flexDirection: 'column'
  })

  cssRule('header', {
    'fontSize': '30px',
    'textAlign': 'center',
    'marginTop': '20px',
    'marginBottom': '15px'
  })
}
