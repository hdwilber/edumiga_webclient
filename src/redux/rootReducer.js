import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import accountReducer from './account/reducer'
import institutionReducer from './institution/reducer'
import opportunityReducer from './opportunity/reducer'
import constantReducer from './constants/reducer'
import courseReducer from './course/reducer'
import modalReducer from './modal/reducer'
import categoryReducer from './category/reducer'
import saverReducer from './saver/reducer'

export default combineReducers({
  router: routerReducer,
  account: accountReducer,
  institution: institutionReducer,
  opportunity: opportunityReducer,
  opp: opportunityReducer,
  constant: constantReducer,
  course: courseReducer,
  modal: modalReducer,
  category: categoryReducer,
  saver: saverReducer,
})
