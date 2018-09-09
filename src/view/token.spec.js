/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Token } from './token'
import { numberStyle, operatorStyle, equalsStyle, clearStyle } from './style'

describe('Token', () => {
  it('can display a number', () => {
    const wrapper = shallow(<Token value={5} />)
    const div = wrapper.find('div')
    expect(div.text()).toBe('5')
    expect(div.hasClass(numberStyle)).toBeTruthy()
  })

  it('can display an operator', () => {
    const wrapper = shallow(<Token value='+' />)
    const div = wrapper.find('div')
    expect(div.text()).toBe('+')
    expect(div.hasClass(operatorStyle)).toBeTruthy()
  })

  it('can display an equals sign', () => {
    const wrapper = shallow(<Token value='=' />)
    const div = wrapper.find('div')
    expect(div.text()).toBe('=')
    expect(div.hasClass(equalsStyle)).toBeTruthy()
  })

  it('displays a division sign', () => {
    const wrapper = shallow(<Token value='/' />)
    const div = wrapper.find('div')
    expect(div.text()).toBe('\u00F7')
    expect(div.hasClass(operatorStyle)).toBeTruthy()
  })

  it('displays a multiplication sign', () => {
    const wrapper = shallow(<Token value='*' />)
    const div = wrapper.find('div')
    expect(div.text()).toBe('x')
    expect(div.hasClass(operatorStyle)).toBeTruthy()
  })

  it('can display an Clear sign', () => {
    const wrapper = shallow(<Token value='C' />)
    const div = wrapper.find('div')
    expect(div.text()).toBe('C')
    expect(div.hasClass(clearStyle)).toBeTruthy()
  })

  it('can display an Clear All sign', () => {
    const wrapper = shallow(<Token value='AC' />)
    const div = wrapper.find('div')
    expect(div.text()).toBe('AC')
    expect(div.hasClass(clearStyle)).toBeTruthy()
  })
})
