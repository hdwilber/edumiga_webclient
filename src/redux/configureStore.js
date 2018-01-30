import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import rootReducer from './rootReducer'
import qHistory from 'qhistory'
import { stringify, parse } from 'qs'


export const history = qHistory( createHistory({
  basename: process.env.PUBLIC_URL
}),
  stringify,
  parse)

const initialState = {}
const enhancers = []
const middleware = [thunkMiddleware, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store
