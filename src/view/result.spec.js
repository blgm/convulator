/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import {Result} from './result'

describe('Result', () => {
  it('displays nothing when there is no result', () => {
    const wrapper = shallow(<Result result={undefined} />)
    const number = wrapper.find('Number')
    expect(number.length).toBe(0)
  })

  it('displays a result', () => {
    const wrapper = shallow(<Result result={42} />)
    const number = wrapper.find('Number')
    expect(number.length).toBe(1)
    expect(number.at(0).prop('value')).toBe(42)
  })
})
