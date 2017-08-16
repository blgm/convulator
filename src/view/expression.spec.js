/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import {Expression} from './expression'

describe('Expression', () => {
  it('displays nothing when empty', () => {
    const wrapper = shallow(<Expression expression={[]} />)
    const tokens = wrapper.find('TransitionGroup').children()
    expect(tokens).toHaveLength(0)
  })

  it('can display a single number', () => {
    const expression = [4]
    const wrapper = shallow(<Expression expression={expression} />)
    const tokens = wrapper.find('Token')
    expect(tokens).toHaveLength(0)
    const numbers = wrapper.find('Number')
    expect(numbers).toHaveLength(1)
    expect(numbers.at(0).prop('value')).toBe(4)
  })

  it('can display an expression with many tokens', () => {
    const expression = [1, '+', 2, '*', 3]
    const wrapper = shallow(<Expression expression={expression} />)
    const tokens = wrapper.find('TransitionGroup').children()
    expect(tokens.length).toBe(5)
    expect(tokens.at(0).children().at(0).prop('value')).toBe(1)
    expect(tokens.at(1).children().at(0).prop('value')).toBe('+')
    expect(tokens.at(2).children().at(0).prop('value')).toBe(2)
    expect(tokens.at(3).children().at(0).prop('value')).toBe('*')
    expect(tokens.at(4).children().at(0).prop('value')).toBe(3)
  })
})
