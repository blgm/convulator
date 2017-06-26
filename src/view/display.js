import React from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import PropTypes from 'prop-types'
import {Token} from './token'
import {lineStyle, displayStyle} from './style'
import {style} from 'typestyle'

const transitionStyle = style({
  $nest: {
    '&-enter': {
      opacity: 0
    },
    '&-enter-active': {
      opacity: 1,
      transition: 'opacity 250ms ease-in'
    }
  }
})

export function Display ({expression, result}) {
  let line = [].concat(expression)
  if (typeof result === 'number') {
    line.push('=', result)
  }

  const tokens = line.map((value, index) => <Token value={value} key={index} />)
  return (
    <div className={displayStyle}>
      <CSSTransitionGroup className={lineStyle}
        transitionName={transitionStyle}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}>
        {tokens}
      </CSSTransitionGroup>
    </div>
  )
}
Display.PropTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  result: PropTypes.number.isRequired
}
