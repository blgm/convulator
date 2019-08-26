/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Convulator from './convulator'
import Expression from './expression'
import Result from './result'
import Buttons from './button'

describe('Convulator', () => {
  it('contains the expected components', () => {
    const fakeStore = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn().mockReturnValue({ tokens: [{ type: 'number', value: 4 }], result: 4 })
    }

    const wrapper = mount(<Provider store={fakeStore}><Convulator /></Provider>)

    const expression = wrapper.find(Expression)
    expect(expression).toHaveLength(1)

    const result = wrapper.find(Result)
    expect(result).toHaveLength(1)

    const buttons = wrapper.find(Buttons)
    expect(buttons).toHaveLength(1)
  })
})
