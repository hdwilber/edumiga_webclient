import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import accountReducer from './account/reducer'
import institutionReducer from './institution/reducer'

export default combineReducers({
  router: routerReducer,
  account: accountReducer,
  institution: institutionReducer,
})
