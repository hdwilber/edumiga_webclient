import * as actions from './actions'

const initialState = {
  session: null,
  identity: null,
  identities: [],
  current: null,
  id: null,

  loading: false,
  error: null,
}

export default function accountReducer(state = initialState, action) {
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
        loading: false,
      }
    }

    case actions.CREATE.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case actions.LOGIN.START: {
      return {
        ...initialState,
        loading: true,
      }
    }

    case actions.LOGIN.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case actions.LOGIN.FULFILLED: {
      const session = action.payload
      return {
        ...state,
        loading: false,
        session: session,
        id: session.accountId,
      }
    }

    case actions.LOGOUT.START: {
      return initialState
    }

    case actions.RESTORE.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.RESTORE.REJECTED: {
      return {
        ...state,
        loading: false,
        session: null,
        identity: null,
        error: action.payload,
      }
    }

    case actions.RESTORE.FULFILLED: {
      const session = action.payload
      if (session) {
        return {
          ...state,
          loading: false,
          session,
          id: session.accountId,
        }
      }
    }
    break

    case actions.FIND.START: {
      return {
        ...state,
        account: null,
        identities: null,
        loading: true,
      }
    }

    case actions.FIND.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case actions.FIND.FULFILLED: {
      const account = action.payload
      const identities = account.identities || []
      delete account.identities

      return {
        ...state,
        loading: false,
        identity: identities[0],
        current: account,
        identities,
      }
    }

    case actions.IDENTITY_UPDATE.START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.IDENTITY_UPDATE.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case actions.IDENTITY_UPDATE.FULFILLED: {
      const identity = action.payload
      return {
        ...state,
        loading: false,
        identity: {
          ...state.identity,
          ...identity,
        }
      }
    }

    case actions.UPLOAD_PHOTO: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.UPLOAD_PHOTO.REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case actions.UPLOAD_PHOTO.FULFILLED: {
      const photo = action.payload
      return {
        ...state,
        loading: false,
        identity: {
          ...state.identity,
          photo,
        }
      }
    }
  }
  return state
}
