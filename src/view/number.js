import React from 'react'
import {numberStyle} from './style'
import {style} from 'typestyle'
import {CSSTransitionGroup} from 'react-transition-group'

const transitionStyle = style({
  $nest: {
    '&-enter': {
      opacity: 0,
      width: 0
    },
    '&-enter-active': {
      opacity: 1,
      width: '12px',
      transition: 'all 250ms ease'
    },
    '&-leave': {
      opacity: 1,
      width: '12px'
    },
    '&-leave-active': {
      opacity: 0,
      width: 0,
      transition: 'all 250ms ease'
    }
  }
})

export function Number ({value}) {
  const digits = value.toString().split('').map((digit, index) => <Digit value={digit} key={index} />)
  return <CSSTransitionGroup
    className={numberStyle}
    transitionName={transitionStyle}
    transitionEnterTimeout={250}
    transitionLeaveTimeout={250}>
    {digits}
  </CSSTransitionGroup>
}

function Digit ({value}) {
  return <div>{value}</div>
}
