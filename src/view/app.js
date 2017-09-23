import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from '../state/store'
import Convulator from './convulator'
import {Provider} from 'react-redux'
import {cssRule} from 'typestyle'

function render () {
  ReactDOM.render(
    <Provider store={createStore()} >
      <Convulator />
    </Provider>,
    document.getElementById('root')
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

setupPage()
render()
