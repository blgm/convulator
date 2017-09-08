import React from 'react'
import {Buttons} from './button'
import {Expression} from './expression'
import {Result} from './result'
import {displayStyle, dividerStyle} from './style'
import {connect} from 'react-redux'

export const mapStateToProps = state => ({
  expression: /* istanbul ignore next */ state.tokens.map(t => t.value),
  result: state.result
})

export const dispatchProps = dispatch => ({dispatcher: dispatch})

export const UnconnectedConvulator = ({expression, result, dispatcher}) => {
  return (
    <div>
      <div className={displayStyle}>
        <Expression expression={expression} />
        <div className={dividerStyle} />
        <Result result={result} />
      </div>
      <Buttons dispatcher={dispatcher} />
    </div>
  )
}

export const Convulator = connect(mapStateToProps, dispatchProps)(UnconnectedConvulator)
