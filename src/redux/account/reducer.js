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
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case actions.LOGIN.success: {
      const session = action.payload
      return {
        ...state,
        loading: false,
        session: session,
        id: session.accountId,
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
        error: action.payload,
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
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case actions.FIND.success: {
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

    case actions.IDENTITY_UPDATE.start: {
      return {
        ...state,
        loading: true,
      }
    }

    case actions.IDENTITY_UPDATE.failed: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case actions.IDENTITY_UPDATE.success: {
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
