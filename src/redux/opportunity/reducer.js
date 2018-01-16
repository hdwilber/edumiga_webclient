import * as actions from './actions'

const initialState = {
  current: null,
  list: null,
  loading: false,
  error: null,
  courses: [],
  currentCourse: null,
}

export default function opportunityReducer(state = initialState, action) {
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
        current: action.payload.opportunity,
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
      const { opportunity } = action.payload
      return {
        ...state,
        current: opportunity,
        courses: opportunity.courses,
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

    case actions.COURSE_ADD.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.COURSE_ADD.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.COURSE_ADD.FULFILLED: {
      return {
        ...state,
        loading: false,
        courses: state.courses.concat([action.payload]),
        currentCourse: action.payload,
      }
    }

    case actions.COURSE_DEL.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.COURSE_DEL.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.COURSE_DEL.FULFILLED: {
      const id = action.payload
      return {
        ...state,
        loading: false,
        courses: state.courses.filter(c => c.id !== id),
      }
    }

    case actions.COURSE_UPDATE.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.COURSE_UPDATE.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case actions.COURSE_UPDATE.FULFILLED: {
      const {course} = action.payload
      return {
        ...state,
        loading: false,
        courses: state.courses.map(c => c.id !== course.id ? c : {...c, ...course}),
        currentCourse: action.payload,
      }
    }
  }
  return state
}
