import React from 'react'
import ReactDOM from 'react-dom'
import {store} from '../model/statestore'
import {Convulator} from './convulator'

function render () {
  const state = store.getState()
  ReactDOM.render(
    <Convulator state={state} dispatcher={store.dispatch} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
