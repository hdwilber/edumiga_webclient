import * as actions from './actions'

const initialState = {
  current: null,
  list: null,
  loading: false,
  error: null,
}

export default function institutionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.CREATE.FULFILLED: {
      return {
        ...state,
        current: action.payload.institution,
        loading: false,
      }
    }

    case actions.CREATE.REJECTED: {
      return {
        ...state,
        current: null,
        loading: false,
      }
    }

    case actions.FIND.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.FIND.FULFILLED: {
      return {
        ...state,
        current: action.payload.institution,
        list: null,
        loading: false,
      }
    }

    case actions.FIND.REJECTED: {
      return {
        ...state,
        loading: false,
        current: null,
        list: null,
      }
    }

    case actions.FIND_ALL.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.FIND_ALL.FULFILLED: {
      return {
        ...state,
        current: null,
        list: action.payload.list,
        loading: false,
      }
    }

    case actions.FIND_ALL.REJECTED: {
      return {
        ...state,
        loading: false,
        current: null,
        list: null,
        error: action.payload
      }
    }

    case actions.ADD_OPPORTUNITY: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.ADD_OPPORTUNITY.FULFILLED: {
      return {
        ...state,
        loading: false,
        current: {
          ...state.current,
          opportunities: state.current.opportunities.concat(action.payload)
        }
      }
    }

    case actions.ADD_OPPORTUNITY.REJECTED: {
      return {
        ...state,
        error: action.payload,
      }
    }
  }
  return state
}
