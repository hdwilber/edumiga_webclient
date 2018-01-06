import * as actions from './actions'

const initialState = {
  session: null,
  identity: null,
  loading: false,
  error: null,
}

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_ACCOUNT.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.CREATE_ACCOUNT.FULFILLED: {
      return {
        ...state,
        loading: false,
      }
    }

    case actions.CREATE_ACCOUNT.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case actions.SESSION_LOGIN.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.SESSION_LOGIN.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case actions.SESSION_LOGIN.FULFILLED: {
      return {
        ...state,
        loading: false,
        session: action.payload.session,
        identity: action.payload.identity,
      }
    }

    case actions.SESSION_LOGOUT.START: {
      return {
        ...state,
        session: null,
        identity: null,
      }
    }

    case actions.SESSION_RESTORE.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.SESSION_RESTORE.REJECTED: {
      return {
        ...state,
        loading: true,
        session: null,
        identity: null,
        error: action.payload,
      }
    }

    case actions.SESSION_RESTORE.FULFILLED: {
      return {
        ...state,
        loading: true,
        session: action.payload.session,
        identity: action.payload.identity,
      }
    }
  }
  return state
}
