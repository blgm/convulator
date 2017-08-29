/* eslint-env jest */
import ReactDOM from 'react-dom'
import * as store from '../state/store'

describe('index', () => {
  it('interacts with the store and React.render()', () => {
    const myStore = store.createStore()
    jest.spyOn(store, 'createStore').mockImplementation(() => myStore)
    jest.spyOn(myStore, 'getState').mockImplementation(() => undefined)
    jest.spyOn(myStore, 'dispatch').mockImplementation(() => undefined)
    jest.spyOn(myStore, 'subscribe').mockImplementation(() => undefined)

    jest.spyOn(ReactDOM, 'render').mockImplementation(() => undefined)

    require('./index')

    expect(myStore.getState).toHaveBeenCalled()
    expect(myStore.dispatch).not.toHaveBeenCalled()
    expect(myStore.subscribe).toHaveBeenCalled()
    expect(ReactDOM.render).toHaveBeenCalled()
  })
})
