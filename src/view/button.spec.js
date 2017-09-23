/* eslint-env jest */
import React from 'react'
import {shallow, mount} from 'enzyme'
import {Button, Buttons} from './button'

describe('Button (individual)', () => {
  it('contains a token with the correct value', () => {
    const fakeDispatcher = jest.fn()
    const wrapper = shallow(<Button value='+' onSubmit={fakeDispatcher} />)
    expect(wrapper.find('Token').prop('value')).toBe('+')
  })

  it('calls the onSubmit callback when clicked', () => {
    const fakeDispatcher = jest.fn()
    const wrapper = shallow(<Button value='+' onSubmit={fakeDispatcher} />)
    wrapper.find('td').simulate('click')
    expect(fakeDispatcher).toHaveBeenCalled()
  })
})

describe('Buttons (pad)', () => {
  let fakeDispatcher
  let wrapper

  beforeAll(() => {
    fakeDispatcher = jest.fn()
    wrapper = mount(<Buttons dispatcher={fakeDispatcher} />)
  })

  for (let i = 0; i <= 9; i++) {
    it('has the number ' + i, () => {
      const button = wrapper.find('Button').filterWhere(n => n.prop('value') === i)
      expect(button.length).toBe(1)
      button.find('td').simulate('click')
      expect(fakeDispatcher).toHaveBeenCalledWith({ type: 'appendNumber', payload: i })
    })
  }

  ['+', '-', '*', '/'].forEach(operator => {
    it('has the operator ' + operator, function () {
      const button = wrapper.find('Button').filterWhere(n => n.prop('value') === operator)
      expect(button.length).toBe(1)
      button.find('td').simulate('click')
      expect(fakeDispatcher).toHaveBeenCalledWith({ type: 'appendOperator', payload: operator })
    })
  })

  it('has a clear button', () => {
    const button = wrapper.find('Button').filterWhere(n => n.prop('value') === 'C')
    expect(button.length).toBe(1)
    button.find('td').simulate('click')
    expect(fakeDispatcher).toHaveBeenCalledWith({ type: 'clearDigit' })
  })

  it('has a clear all button', () => {
    const button = wrapper.find('Button').filterWhere(n => n.prop('value') === 'AC')
    expect(button.length).toBe(1)
    button.find('td').simulate('click')
    expect(fakeDispatcher).toHaveBeenCalledWith({ type: 'clearAll' })
  })
})
