import * as actions from './actions'
import { Names } from './actions'

const initialState = {
  current: null,
  list: [],
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

    case Names.GET_TYPES.start: {
      return {
        ...state,
        loading: true,
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

    case Names.CREATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case Names.CREATE.success: {
      const { inList, result } = action.payload
      return {
        ...state,
        current: result,
        list: inList ? state.list.concat([result]) : state.list,
        loading: false,
      }
    }

    case Names.CREATE.failed: {
      return {
        ...state,
        current: null,
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
      console.log(action.payload)
      return {
        ...state,
        current: result,
        courses: result.courses.filter(c => !c.draft),
        list: null,
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

    case Names.DELETE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case Names.DELETE.success: {
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

    case Names.DELETE.failed: {
      return {
        ...state,
        loading: false,
      }
    }
  }
  return state
}
