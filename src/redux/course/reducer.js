import * as actions from './actions'

const initialState = {
  current: null,
  list: [],
  loading: false,
  error: null,
  constants: null,
}

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET: {
      const { id } = action.payload
      const course = id !== null ? state.list.find(o => o.id === id) : null
      return {
        ...state,
        current: course,
      }
    }
    case actions.FILL_DATA: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case actions.GET_TYPES.start: {
      return {
        ...state,
        loading: true,
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

    case actions.CREATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.CREATE.success: {
      const { inList, course } = action.payload
      return {
        ...state,
        current: course,
        list: inList ? state.list.concat([course]) : state.list,
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

    case actions.UPDATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.UPDATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.UPDATE.success: {
      const { course, inList } = action.payload

      return {
        ...state,
        loading: false,
        list: inList ? state.list.map(c => c.id !== course.id ? c : course )
          : state.list,
        current: course,
      }
    }


    case actions.FIND.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.FIND.success: {
      const { course } = action.payload
      return {
        ...state,
        current: course,
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

    case actions.DELETE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.DELETE.success: {
      const { id, inList } = action.payload
      if (inList) {
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
  }
  return state
}
