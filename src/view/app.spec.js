/* eslint-env jest */
import ReactDOM from 'react-dom'
import * as store from '../state/store'

describe('index', () => {
  it('interacts with the store and React.render()', () => {
    const myStore = store.createStore()
    jest.spyOn(store, 'createStore').mockImplementation(() => myStore)
    jest.spyOn(ReactDOM, 'render').mockImplementation(() => undefined)

    require('./app')

    expect(store.createStore).toHaveBeenCalled()
    expect(ReactDOM.render).toHaveBeenCalled()
  })
})
