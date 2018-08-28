import * as actions from './actions'
import { Names } from './actions'

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

    case Names.GET_TYPES.success: {
      const { result } = action.payload
      return {
        ...state,
        loading: false,
        constants: result,
      }
    }

    case Names.GET_TYPES.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case Names.GET_TYPES.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case Names.UPDATE.start: {
      return {
        ...state,
        laoding: true,
      }
    }

    case Names.UPDATE.success: {
      const { isDependency, result } = action.payload
      if(isDependency) {
        const list = state.current.dependencies.map(d => (d.id === result.id) ? result: d)
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
            ...result,
          },
        }
      }
    }
    case Names.UPDATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case Names.CREATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case Names.CREATE.success: {
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


    case Names.FIND.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case Names.FIND.success: {
      const { result } = action.payload
      return {
        ...state,
        current: result,
        loading: false,
      }
    }

    case Names.FIND.failed: {
      return {
        ...state,
        loading: false,
        current: null,
        list: null,
      }
    }
    case Names.FIND_RESUME.start: {
      return {
        ...state,
        loading: true,
        current: null,
      }
    }

    case Names.FIND_RESUME.success: {
      const { result } = action.payload
      return {
        ...state,
        current: result,
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

    case Names.FIND_ALL.start: {
      return {
        ...state,
        list: null,
        loading: true,
      }
    }

    case Names.FIND_ALL.success: {
      const { result: { list, count } } = action.payload
        console.log(action.payload)
      return {
        ...state,
        current: null,
        list,
        count,
        loading: false,
      }
    }

    case Names.FIND_ALL.failed: {
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

    case Names.DEP_CREATE.start: {
      return {
        ...state,
        loading: true,
      }
    }
    case Names.DEP_CREATE.success: {
      const { result } = action.payload
      const { dependencies } = state.current

      const newList = dependencies.concat([result])

      return {
        ...state,
        loading: true,
        current: {
          ...state.current,
          dependencies: newList,
        }
      }
    }

    case Names.DEP_CREATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case Names.DEP_UPDATE.start: {
      return {
        ...state,
        loading: true,
      }
    }
    case Names.DEP_UPDATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case Names.DEP_UPDATE.success: {
      const { result } = action.payload
      const { dependencies } = state.current

      const newList = dependencies.map(dep => {
        if (dep.id === result.id) {
          return {
            ...dep,
            ...result,
          }
        }
        return dep
      })

      return {
        ...state,
        loading: true,
        current: {
          ...state.current,
          dependencies: newList,
        }
      }
    }

    case Names.OPP_CREATE.start: {
      return {
        ...state,
        loading: true,
      }
    }
    case Names.OPP_CREATE.success: {
      const { result } = action.payload
      const { opportunities } = state.current

      const newList = opportunities.concat([result])

      return {
        ...state,
        loading: true,
        current: {
          ...state.current,
          opportunities: newList,
        }
      }
    }

    case Names.OPP_CREATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case Names.OPP_UPDATE.start: {
      return {
        ...state,
        loading: true,
      }
    }
    case Names.OPP_UPDATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case Names.OPP_UPDATE.success: {
      const { result } = action.payload
      const { opportunities } = state.current

      const newList = opportunities.map(opp => {
        if (opp.id === result.id) {
          return {
            ...opp,
            ...result,
          }
        }
        return opp
      })

      return {
        ...state,
        loading: true,
        current: {
          ...state.current,
          opportunities: newList,
        }
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
