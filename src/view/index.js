import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from '../state/store'
import {Convulator} from './convulator'

const store = createStore()

function render () {
  const state = store.getState()
  ReactDOM.render(
    <Convulator state={state} dispatcher={store.dispatch} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
