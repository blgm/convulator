/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import {Display} from './display'

describe('Display', () => {
  it('displays an expression when there is no result', () => {
    const expression = [1, '+', 2, '*', 3]
    const wrapper = shallow(<Display expression={expression} />)
    const tokens = wrapper.find('CSSTransitionGroup').children()
    expect(tokens.length).toBe(5)
    expect(tokens.at(0).prop('value')).toBe(1)
    expect(tokens.at(1).prop('value')).toBe('+')
    expect(tokens.at(2).prop('value')).toBe(2)
    expect(tokens.at(3).prop('value')).toBe('*')
    expect(tokens.at(4).prop('value')).toBe(3)
  })

  it('displays an expression and a result', () => {
    const expression = [1, '+', 2, '*', 3]
    const result = 7
    const wrapper = shallow(<Display expression={expression} result={result} />)
    const tokens = wrapper.find('CSSTransitionGroup').children()
    expect(tokens.length).toBe(7)
    expect(tokens.at(0).prop('value')).toBe(1)
    expect(tokens.at(1).prop('value')).toBe('+')
    expect(tokens.at(2).prop('value')).toBe(2)
    expect(tokens.at(3).prop('value')).toBe('*')
    expect(tokens.at(4).prop('value')).toBe(3)
    expect(tokens.at(5).prop('value')).toBe('=')
    expect(tokens.at(6).prop('value')).toBe(7)
  })
})
