/* eslint-env jest */
import ReactDOM from 'react-dom'
import {store} from '../state/statestore'

describe('index', () => {
  it('iteracts with the store and React.render()', () => {
    jest.spyOn(ReactDOM, 'render').mockImplementation(() => undefined)
    jest.spyOn(store, 'getState').mockImplementation(() => undefined)
    jest.spyOn(store, 'dispatch').mockImplementation(() => undefined)
    jest.spyOn(store, 'subscribe').mockImplementation(() => undefined)
    require('./index')

    expect(store.getState).toHaveBeenCalled()
    expect(store.dispatch).not.toHaveBeenCalled()
    expect(store.subscribe).toHaveBeenCalled()
    expect(ReactDOM.render).toHaveBeenCalled()
  })
})
