import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Token } from './token'
import { Number } from './number'
import { style } from 'typestyle'

export const expressionStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '10px 20px',
  minHeight: '45px'
})

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

export function Expression ({ expression }) {
  return (
    <TransitionGroup className={expressionStyle} >
      {expression.map((token, index) => (
        <CSSTransition
          key={index}
          classNames={transitionStyle}
          timeout={250}
        >
          {token.type === 'number'
            ? <Number value={token.value} />
            : <Token value={token.value} />
          }
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
Expression.propTypes = {
  expression: PropTypes.array.isRequired
}

const mapStateToProps = state => ({ expression: state.tokens })

export default connect(mapStateToProps)(Expression)
