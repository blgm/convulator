import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'
import {Token} from './token'
import {Number} from './number'
import {lineStyle, displayStyle} from './style'
import {style} from 'typestyle'

const transitionStyle = style({
  $nest: {
    '&-enter': {
      opacity: 0
    },
    '&-enter-active': {
      opacity: 1,
      transition: 'opacity 250ms ease'
    },
    '&-exit': {
      opacity: 1
    },
    '&-exit-active': {
      opacity: 0,
      transition: 'opacity 250ms ease'
    }
  }
})

export function Display ({expression, result}) {
  let line = [].concat(expression)
  if (typeof result === 'number') {
    line.push('=', result)
  }

  const tokens = line.map((value, index) => (
    <CSSTransition
      key={index}
      classNames={transitionStyle}
      timeout={250}
    >
      {typeof value === 'number'
        ? <Number value={value} />
        : <Token value={value} />}
    </CSSTransition>
  ))

  return (
    <div className={displayStyle}>
      <TransitionGroup className={lineStyle}>
        {tokens}
      </TransitionGroup>
    </div>
  )
}
Display.PropTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  result: PropTypes.number.isRequired
}
