/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'
import {UnconnectedConvulator, mapStateToProps, dispatchProps} from './convulator'
import {Expression} from './expression'
import {Result} from './result'
import {Buttons} from './button'

describe('Convulator', () => {
  describe('UnconnectedConvulator', () => {
    it('contains the expected components', () => {
      const fakeProps = {
        expression: [],
        result: 10,
        dispatcher: jest.fn()
      }

      const wrapper = mount(<UnconnectedConvulator {...fakeProps} />)

      const expression = wrapper.find('Expression')
      expect(expression).toHaveLength(1)
      expect(expression.contains(<Expression expression={fakeProps.expression} />)).toBeTruthy()

      const result = wrapper.find('Result')
      expect(result).toHaveLength(1)
      expect(result.contains(<Result result={fakeProps.result} />)).toBeTruthy()

      const buttons = wrapper.find('Buttons')
      expect(buttons).toHaveLength(1)
      expect(buttons.contains(<Buttons dispatcher={fakeProps.dispatcher} />)).toBeTruthy()
    })
  })

  describe('mapStateToProps', () => {
    it('maps the state to the right props', () => {
      const fakeState = {
        tokens: [{value: 6}],
        result: 6
      }
      expect(mapStateToProps(fakeState)).toEqual({
        expression: [6],
        result: 6
      })
    })
  })

  describe('dispatchProps', () => {
    it('maps the dispatch method', () => {
      expect(dispatchProps(42)).toEqual({dispatcher: 42})
    })
  })
})
