/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Result from './result'

describe('Result', () => {
  let fakeStore
  beforeEach(() => {
    fakeStore = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn()
    }
  })

  it('displays nothing when there is no result', () => {
    fakeStore.getState.mockReturnValue({ result: undefined })
    const wrapper = mount(<Provider store={fakeStore}><Result /></Provider>)
    const number = wrapper.find('Number')
    expect(number.length).toBe(0)
  })

  it('displays a result', () => {
    fakeStore.getState.mockReturnValue({ result: 42 })
    const wrapper = mount(<Provider store={fakeStore}><Result /></Provider>)
    const number = wrapper.find('Number')
    expect(number.length).toBe(1)
    expect(number.at(0).prop('value')).toBe(42)
  })
})
