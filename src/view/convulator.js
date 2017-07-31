import React from 'react'
import {Buttons} from './button'
import {Display} from './display'
import {cssRule} from 'typestyle'

export function Convulator ({state, dispatcher}) {
  setupPage()

  return (
    <div>
      <Display expression={state.tokens} result={state.result} />
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
