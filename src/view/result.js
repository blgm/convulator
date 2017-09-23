import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Number} from './number'
import {style} from 'typestyle'

export const resultStyle = style({
  display: 'flex',
  padding: '10px 20px',
  height: '45px'
})

function UnconnectedResult ({result}) {
  return (
    <div className={resultStyle}>
      {typeof result !== 'number'
        ? null
        : <Number value={result} />
      }
    </div>
  )
}
UnconnectedResult.propTypes = {
  result: PropTypes.number
}

const mapStateToProps = state => ({result: state.result})

export default connect(mapStateToProps)(UnconnectedResult)
