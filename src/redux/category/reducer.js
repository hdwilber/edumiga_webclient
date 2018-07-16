import * as actions from './actions'

const initialState = {
  error: null,
  loading: false,
  list: null
}

export default function categoriesReducer(state = initialState, action) {
  switch(action.type) {
    case actions.FIND_ALL.start: {
      return {
        ...state,
        loading: true,
      }
    }
    case actions.FIND_ALL.failed: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error,
      }
    }
    case actions.FIND_ALL.success: {
      const { result } = action.payload
      return {
        ...state,
        loading: false,
        list: result.list,
      }
    }
  }
  return state
}
