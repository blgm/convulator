/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'
import {Convulator} from './convulator'
import {Expression} from './expression'
import {Result} from './result'
import {Buttons} from './button'

describe('Convulator', () => {
  it('contains the expected components', () => {
    const fakeState = {tokens: [], result: null}
    const fakeDispatcher = jest.fn()
    const wrapper = mount(<Convulator state={fakeState} dispatcher={fakeDispatcher} />)

    const expression = wrapper.find('Expression')
    expect(expression).toHaveLength(1)
    expect(expression.contains(<Expression expression={fakeState.tokens} />)).toBeTruthy()

    const result = wrapper.find('Result')
    expect(result).toHaveLength(1)
    expect(result.contains(<Result result={fakeState.result} />)).toBeTruthy()

    const buttons = wrapper.find('Buttons')
    expect(buttons).toHaveLength(1)
    expect(buttons.contains(<Buttons dispatcher={fakeDispatcher} />)).toBeTruthy()
  })
})
