import * as actions from './actions'

const initialState = {
  error: null,
  loading: false,
  constants: {}
}

export default function constantsReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.GET.REJECTED: {
      return {
        ...state,
        loading: false,
      }
    }

    case actions.GET.FULFILLED: {
      return {
        ...state,
        loading: false,
        constants: {
          ...action.payload.data
        }
      }
    }
  }
  return state
}
