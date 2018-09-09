import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Token } from './token'
import { displayStyle } from './style'
import { actions } from '../state/store'

export function Button ({ value, onSubmit }) {
  return <td onClick={onSubmit}><Token value={value} /></td>
}
Button.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSubmit: PropTypes.func.isRequired
}

export function Buttons ({ appendNumber, appendOperator, clearDigit, clearAll }) {
  // Generate a function for the onSubmit event
  function getOnSubmit (value) {
    if (typeof value === 'number') {
      return () => appendNumber(value)
    } else if (value === 'C') {
      return clearDigit
    } else if (value === 'AC') {
      return clearAll
    } else {
      return () => appendOperator(value)
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
Buttons.propTypes = {
  appendNumber: PropTypes.func.isRequired,
  appendOperator: PropTypes.func.isRequired,
  clearDigit: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(undefined, mapDispatchToProps)(Buttons)
