import * as actions from './actions'

const initialState = {
  current: null,
  currentOpp: null,
  count: 0,
  list: null,
  loading: false,
  error: null,
  constants: null,
  resume: null,
}

export default function institutionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_CURRENT: {
      return {
        ...state,
        current: action.payload,
      }
    }
    case actions.UNSET: {
      return {
        ...state,
        current: null,
      }
    }

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


    case actions.UPDATE.start: {
      return {
        ...state,
        laoding: true,
      }
    }

    case actions.UPDATE.success: {
      const { isDependency, institution, single } = action.payload
      console.log('UPDATE')
      console.log(action.payload)
      if(isDependency) {
        const list = state.current.dependencies.map(d => (d.id === institution.id) ? institution: d)
        return {
          ...state,
          loading: false,
          current: {
            ...state.current,
            dependencies: list,
          }
        }
      } else {
        return {
          ...state,
          loading: false,
          current: {
            ...state.current,
            ...institution,
          },
        }
      }
    }
    case actions.UPDATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.CREATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.CREATE.success: {
      const { institution, isDependency } = action.payload
      console.log('CREATE')
      console.log(action.payload)
      if (isDependency) {
        const list = state.current.dependencies.concat([institution])
        return {
          ...state,
          loading: false,
          current: {
            ...state.current,
            dependencies: list,
          }
        }
      } else {
        return {
          ...state,
          current: institution,
          loading: false,
        }
      }
    }

    case actions.CREATE.failed: {

      return {
        ...state,
        current: null,
        loading: false,
      }
    }

    case actions.DELETE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.DELETE.success: {
      const { id, isDependency, inList } = action.payload
      if (isDependency) {
        return {
          ...state,
          loading: false,
          current: {
            ...state.current,
            dependencies: state.current.dependencies.filter(e =>e.id !== id)
          }
        }
      } else if (inList) {
        return {
          ...state,
          loading: false,
          list: state.list.filter(l => l.id !== id),
        }
      } else {
        return {
          ...state,
          current: null,
          loading: false,
        }
      }
    }

    case actions.DELETE.failed: {
      return {
        ...state,
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
    case actions.FIND_RESUME.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.FIND_RESUME.success: {
      const { result: resume } = action.payload
      return {
        ...state,
        resume,
        loading: false,
      }
    }

    case actions.FIND_RESUME.failed: {
      return {
        ...state,
        loading: false,
        resume: null,
      }
    }

    case actions.FIND_ALL.start: {
      return {
        ...state,
        list: null,
        loading: true,
      }
    }

    case actions.FIND_ALL.success: {
      const { result: { list, count } } = action.payload
      return {
        ...state,
        current: null,
        list,
        count,
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

    //case actions.SET_CURRENT_OPP: {
      //return {
        //...state,
        //currentOpp: action.payload.opp,
      //}
    //}

    case actions.ADD_OPPORTUNITY.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.ADD_OPPORTUNITY.success: {
      const { opp, isNewInstance } = action.payload

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
  }
  return state
}
