/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Expression from './expression'

describe('Expression', () => {
  let fakeStore
  beforeEach(() => {
    fakeStore = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn()
    }
  })

  it('displays nothing when empty', () => {
    fakeStore.getState.mockReturnValue({ tokens: [] })
    const wrapper = mount(<Provider store={fakeStore}><Expression /></Provider>)
    const tokens = wrapper.find('TransitionGroup').children().children()
    expect(tokens).toHaveLength(0)
  })

  it('can display a single number', () => {
    fakeStore.getState.mockReturnValue({ tokens: [{ value: 4, type: 'number' }] })
    const wrapper = mount(<Provider store={fakeStore}><Expression /></Provider>)
    const tokens = wrapper.find('Token')
    expect(tokens).toHaveLength(0)
    const numbers = wrapper.find('Number')
    expect(numbers).toHaveLength(1)
    expect(numbers.at(0).prop('value')).toBe(4)
  })

  it('can display an expression with many tokens', () => {
    fakeStore.getState.mockReturnValue({ tokens: [
      { value: 4, type: 'number' },
      { value: '+', type: 'operator' },
      { value: 2, type: 'number' },
      { value: '*', type: 'operator' },
      { value: 3, type: 'number' }
    ] })

    const wrapper = mount(<Provider store={fakeStore}><Expression /></Provider>)
    const tokens = wrapper.find('TransitionGroup').children()
    expect(tokens).toMatchSnapshot()
  })
})
