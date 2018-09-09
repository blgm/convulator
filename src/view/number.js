import React from 'react'
import { numberStyle } from './style'
import { style } from 'typestyle'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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
    '&-exit': {
      opacity: 1,
      width: '12px'
    },
    '&-exit-active': {
      opacity: 0,
      width: 0,
      transition: 'all 250ms ease'
    }
  }
})

export function Number ({ value }) {
  const digits = value.toString().split('').map((digit, index) => (
    <CSSTransition
      key={index}
      classNames={transitionStyle}
      timeout={250}
    >
      <Digit value={digit} />
    </CSSTransition>
  ))

  return <TransitionGroup className={numberStyle}>{digits}</TransitionGroup>
}

function Digit ({ value }) {
  return <div>{value}</div>
}
