import * as actions from './actions'

const initialState = {
  current: null,
  list: null,
  loading: false,
  error: null,
  constants: null,
}

export default function institutionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_TYPES.FULFILLED: {
      const data = action.payload
      return {
        ...state,
        loading: false,
        constants: data,
      }
    }

    case actions.GET_TYPES.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.GET_TYPES.START: {
      return {
        ...state,
        loading: true,
      }
    }

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
      const { opp, isNewInstance } = action.payload
      console.log('aDd opoprtunity')
      console.log(opp)
      console.log(isNewInstance)

      const list = (isNewInstance) ? state.current.opportunities.concat([opp])
        : state.current.opportunities.map(o => (o.id === opp.id) ? opp : o)

      return {
        ...state,
        loading: false,
        current: {
          ...state.current,
          opportunities: list,
        }
      }
    }

    case actions.ADD_OPPORTUNITY.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.REM_OPPORTUNITY: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.REM_OPPORTUNITY.FULFILLED: {
      const { id } = action.payload
      return {
        ...state,
        loading: false,
        current: {
          ...state.current,
          opportunities: state.current.opportunities.filter(e =>e.id !== id)
        }
      }
    }

    case actions.REM_OPPORTUNITY.REJECTED: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }
  }
  return state
}
