/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import {Convulator} from './convulator'
import {Buttons} from './button'
import {Display} from './display'

describe('Convulator', () => {
  it('contains the expected components', () => {
    const fakeState = {tokens: [], result: null}
    const fakeDispatcher = jest.fn()
    const wrapper = shallow(<Convulator state={fakeState} dispatcher={fakeDispatcher} />)
    expect(wrapper.containsAllMatchingElements([
      <Display expression={fakeState.tokens} result={fakeState.result} />,
      <Buttons dispatcher={fakeDispatcher} />
    ])).toBeTruthy()
  })
})
