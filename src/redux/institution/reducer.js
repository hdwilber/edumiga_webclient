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
    case actions.GET_TYPES.success: {
      const data = action.payload
      return {
        ...state,
        loading: false,
        constants: data,
      }
    }

    case actions.GET_TYPES.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.GET_TYPES.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.CREATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.CREATE.success: {
      return {
        ...state,
        current: action.payload.institution,
        loading: false,
      }
    }

    case actions.CREATE.failed: {
      return {
        ...state,
        current: null,
        loading: false,
      }
    }

    case actions.FIND.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.FIND.success: {
      return {
        ...state,
        current: action.payload.institution,
        list: null,
        loading: false,
      }
    }

    case actions.FIND.failed: {
      return {
        ...state,
        loading: false,
        current: null,
        list: null,
      }
    }

    case actions.FIND_ALL.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.FIND_ALL.success: {
      return {
        ...state,
        current: null,
        list: action.payload.list,
        loading: false,
      }
    }

    case actions.FIND_ALL.failed: {
      return {
        ...state,
        loading: false,
        current: null,
        list: null,
        error: action.payload
      }
    }

    case actions.ADD_OPPORTUNITY.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.ADD_OPPORTUNITY.success: {
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

    case actions.ADD_OPPORTUNITY.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.REM_OPPORTUNITY.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.REM_OPPORTUNITY.success: {
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

    case actions.REM_OPPORTUNITY.failed: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }
    case actions.ADD_DEPENDENCY.start: {
      return {
        ...state,
        loading: true,
      }
    }
    case actions.ADD_DEPENDENCY.success: {
      const { dep, isNewInstance } = action.payload

      const list = (isNewInstance) ? state.current.dependencies.concat([dep])
        : state.current.dependencies.map(d => (d.id === dep.id) ? dep: d)

      return {
        ...state,
        loading: false,
        current: {
          ...state.current,
          dependencies: list,
        }
      }
    }
    case actions.ADD_DEPENDENCY.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
  }
  return state
}
