import * as actions from './actions'

const initialState = {
  error: null,
  loading: false,
  constants: {}
}

export default function constantsReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.GET.failed: {
      return {
        ...state,
        loading: false,
      }
    }

    case actions.GET.success: {
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
