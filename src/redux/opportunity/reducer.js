import * as actions from './actions'

const initialState = {
  current: null,
  list: null,
  loading: false,
  error: null,
  courses: [],
  currentCourse: null,
  constants: null,
}

export default function opportunityReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET: {
      const { id } = action.payload
      const opp = id != null ? state.list.find(o => o.id === id) : null
      return {
        ...state,
        current: opp,
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
      const { inList, opportunity } = action.payload
      return {
        ...state,
        current: opportunity,
        list: inList ? state.list.concat([opportunity]) : state.list,
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
      const { opportunity } = action.payload
      return {
        ...state,
        current: opportunity,
        courses: opportunity.courses.filter(c => !c.draft),
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

    case actions.COURSE_ADD.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.COURSE_ADD.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.COURSE_ADD.success: {
      return {
        ...state,
        loading: false,
        currentCourse: action.payload,
      }
    }

    case actions.COURSE_DEL.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.COURSE_DEL.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.COURSE_DEL.success: {
      const id = action.payload
      return {
        ...state,
        loading: false,
        courses: state.courses.filter(c => c.id !== id),
      }
    }

    case actions.COURSE_UPDATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.COURSE_UPDATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.COURSE_UPDATE.success: {
      const course = action.payload

      if (course.draft) {
        return {
          ...state,
          loading: false,
          currentCourse: null,
          courses: state.courses.filter(c => c.id !== course.id ),
        }
      } else {
        const target = state.courses.find(c => c.id === course.id)
        return {
          ...state,
          loading: false,
          courses: target ? state.courses.map(c => c.id !== course.id ? c: course )
            : state.courses.concat([course]),
          currentCourse: null,
        }
      }
    }

    case actions.COURSE_SET.start: {
      return {
        ...state,
        currentCourse: action.payload,
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
