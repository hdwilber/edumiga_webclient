import * as actions from './actions'

const initialState = {
  session: null,
  identity: null,
  identities: [],
  current: null,
  id: null,

  loading: false,
  confirmed: null,
  error: null,
}


export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.CREATE.success: {
      return {
        ...state,
        loading: false,
      }
    }

    case actions.CREATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case actions.LOGIN.start: {
      return {
        ...initialState,
        loading: true,
      }
    }

    case actions.LOGIN.failed: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error,
      }
    }
    case actions.LOGIN.success: {
      const { result } = action.payload
      return {
        ...state,
        loading: false,
        session: result,
        id: result.accountId,
      }
    }

    case actions.LOGOUT.start: {
      return initialState
    }

    case actions.RESTORE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.RESTORE.failed: {
      return {
        ...state,
        loading: false,
        session: null,
        identity: null,
      }
    }

    case actions.RESTORE.success: {
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

    case actions.FIND.start: {
      return {
        ...state,
        account: null,
        identities: null,
        loading: true,
      }
    }

    case actions.FIND.failed: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error,
      }
    }
    case actions.FIND.success: {
      const { result } = action.payload
      const identities = result.identities || []
      delete result.identities

      return {
        ...state,
        loading: false,
        identity: identities[0],
        current: result,
        identities,
      }
    }

    case actions.IDENTITY_UPDATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.IDENTITY_UPDATE.failed: {
      const { error } = action.payload
      return {
        ...state,
        loading: false,
        error,
      }
    }
    case actions.IDENTITY_UPDATE.success: {
      const { result } = action.payload
      return {
        ...state,
        loading: false,
        identity: {
          ...state.identity,
          ...result,
        }
      }
    }

    case actions.UPLOAD_PHOTO: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.UPLOAD_PHOTO.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case actions.UPLOAD_PHOTO.success: {
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
    case actions.CONFIRM.start: {
      return {
        ...state,
        confirmed: {
          error: null,
          ok: false,
        },
        loading: true,
      }
    }
    case actions.CONFIRM.success: {
      return {
        ...state,
        confirmed: {
          ok: true,
          error: null,
        },
        loading: false,
      }
    }
    case actions.CONFIRM.failed: {
      return {
        ...state,
        confirmed: {
          ok: false,
          error: action.payload,
        },
        loading: false,
      }
    }
  }
  return state
}
