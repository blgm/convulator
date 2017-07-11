/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'
import {Number} from './number'
import {numberStyle} from './style'

describe('Number', () => {
  it('can display a single digit number', () => {
    const wrapper = mount(<Number value={5} />)

    const group = wrapper.find('TransitionGroup')
    expect(group.length).toBe(1)
    expect(group.text()).toBe('5')
    expect(group.hasClass(numberStyle)).toBeTruthy()

    const digits = group.children()
    expect(digits.length).toBe(1)
    expect(digits.text()).toBe('5')
  })

  it('can display a multi digit number', () => {
    const wrapper = mount(<Number value={234} />)

    const group = wrapper.find('TransitionGroup')
    expect(group.length).toBe(1)
    expect(group.text()).toBe('234')
    expect(group.hasClass(numberStyle)).toBeTruthy()

    const digits = group.children()
    expect(digits.length).toBe(3)
    expect(digits.at(0).text()).toBe('2')
    expect(digits.at(1).text()).toBe('3')
    expect(digits.at(2).text()).toBe('4')
  })
})
