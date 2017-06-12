import React from 'react'
import PropTypes from 'prop-types'
import {Token} from './token'
import {displayStyle} from './style'

export function Button ({value, onSubmit}) {
  return <td onClick={onSubmit}><Token value={value} /></td>
}
Button.PropTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSubmit: PropTypes.func.isRequired
}

export function Buttons ({dispatcher}) {
  // Generate a function for the onSubmit event
  function getOnSubmit (value) {
    if (typeof value === 'number') {
      const type = 'APPEND_NUMBER'
      return function () {
        dispatcher({type, value})
      }
    } else if (value === 'C') {
      return function () {
        dispatcher({type: 'CLEAR_DIGIT'})
      }
    } else if (value === 'AC') {
      return function () {
        dispatcher({type: 'CLEAR_ALL'})
      }
    } else {
      const type = 'APPEND_OPERATOR'
      return function () {
        dispatcher({type, value})
      }
    }
  }

  return (
    <div className={displayStyle}>
      <table>
        <tbody>
          <tr>
            <Button value='+' onSubmit={getOnSubmit('+')} />
            <Button value={7} onSubmit={getOnSubmit(7)} />
            <Button value={8} onSubmit={getOnSubmit(8)} />
            <Button value={9} onSubmit={getOnSubmit(9)} />
          </tr>
          <tr>
            <Button value='-' onSubmit={getOnSubmit('-')} />
            <Button value={4} onSubmit={getOnSubmit(4)} />
            <Button value={5} onSubmit={getOnSubmit(5)} />
            <Button value={6} onSubmit={getOnSubmit(6)} />
          </tr>
          <tr>
            <Button value='*' onSubmit={getOnSubmit('*')} />
            <Button value={1} onSubmit={getOnSubmit(1)} />
            <Button value={2} onSubmit={getOnSubmit(2)} />
            <Button value={3} onSubmit={getOnSubmit(3)} />
          </tr>
          <tr>
            <Button value='/' onSubmit={getOnSubmit('/')} />
            <Button value='C' onSubmit={getOnSubmit('C')} />
            <Button value={0} onSubmit={getOnSubmit(0)} />
            <Button value='AC' onSubmit={getOnSubmit('AC')} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}
Buttons.PropTypes = {
  dispatcher: PropTypes.func.isRequired
}
