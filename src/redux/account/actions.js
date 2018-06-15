import { AccountService } from '../../services'
import { push } from 'react-router-redux'
import IdentityService from '../../services/identity'
import { createActionTypesObject, dispatchRequestActions, createActionLabels, handleRequest } from '../utils'
import store from '../configureStore'
import * as ModalActions from '../modal/actions'

export const CREATE = createActionTypesObject('ACCOUNT_CREATE')
export const LOGIN = createActionTypesObject('SESSION_LOGIN')
export const FIND = createActionTypesObject('ACCOUNT_FIND')

export const LOGOUT = createActionLabels('SESSION_LOGOUT')
export const RESTORE = createActionLabels('SESSION_RESTORE')
export const IDENTITY_UPDATE = createActionLabels('IDENTITY_UPDATE')
export const UPLOAD_PHOTO = createActionLabels('IDENTITY_UPLOAD_PHOTO')
export const CONFIRM = createActionLabels('CONFIRM')
export const RECONFIRM = createActionLabels('RECONFIRM')
export const CALCULATE = createActionLabels('CALCULATE')

const aService = new AccountService()
const iService = new IdentityService()


function _calculate({ service, data, options }) {
  return {
    name: CALCULATE,
    request: service.login(data),
    postThen: (dispatch, result, options) => {
      if (options && options.modal)
        dispatch(ModalActions.hide(options.modal.name))
    },
    options,
  }
}

function withService(action, service = aService) {
  return (args) => {
    return (dispatch, getState) => {

      const { session } = getState().account
      if( args.service ) {
        args.service.setSession(session)
      }
      const actionInfo = action({ service, ...args })
      return processAction(dispatch, actionInfo)
    }
  }
}

function processAction (dispatch, info) {
  const { name, request, format, postThen, postCatch, options } = info

  request.then(response => {
    if (response.ok) {
      return response.json ? response.json(): Promise.resolve({})
    }
    return Promise.reject({error: 'Not everything was ok'})
  })
  .then(data => {
    const result = format ? format(data): data
    dispatch({
      type: name.success,
      payload: {
        result,
        options,
      }
    })
    if (postThen) postThen(dispatch, result, options)
  })
  .catch(error => {
    console.log(error)
    dispatch({
      type: name.failed,
      payload: {
        error,
        options,
      }
    })

    if (postCatch) postCatch(dispatch, error, options)
  })

  return dispatch({
    type: name.start,
    payload: {
      options,
    }
  })
}

export const calculate = withService(_calculate)


export function create(data, options = {}) {
  return (dispatch, getState) => {
    const request = aService.create(data)
    return dispatchRequestActions(dispatch, CREATE, request, 
      {
        postThen: (result) => {
          if (options && options.modal)
            dispatch(ModalActions.hide(options.modal.name))
        }
      }, 
      options
    )
  }
}

export function updateIdentity(data) {
  return (dispatch, getState) => {
    const { session } = getState().account
    iService.setSession(session)
    const request = iService.update(data)
    return handleRequest(dispatch, getState, IDENTITY_UPDATE, request)
  }
}

export function login(data, options = {}) {
  return (dispatch, getState) => {
    const request = aService.login(data)
    return dispatchRequestActions(dispatch, LOGIN, request,
      {
        postThen: (result) => {
          aService.storeSessionLocal(result)
          dispatch(findById(result.accountId))
          dispatch(push('/institutions'))
          if (options && options.modal)
            dispatch(ModalActions.hide(options.modal.name))
        }
      }, 
      options
    )
  }
}

export function confirm(uid, token) {
  return (dispatch, getState) => {
    const request = aService.confirm(uid, token)
    return dispatchRequestActions(dispatch, CONFIRM, request,
      {
        postThen: (payload) => {
          setTimeout(() => {
            dispatch(push('/'))
          }, 1500)
        },
        postCatch: (error) => {
          setTimeout(() => {
            dispatch(push('/'))
          }, 1500)
        }
      }
    )
  }
}

export function reConfirm() {
  return (dispatch, getState) => {
    const { account: { session } } = this.props
    aService.setSession(session)
    const request = aService.reConfirm()
    return dispatchRequestActions(dispatch, CONFIRM, request)
  }
}

export function uploadPhoto(file) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.uploadPhoto(account.identity.id, file)
    return handleRequest(dispatch, getState, UPLOAD_PHOTO, request)
  }
}

export function findById(id) {
  return (dispatch, getState) => {
    const { account } = getState()
    aService.setSession(account.session)
    const request = aService.get(id)
    return dispatchRequestActions(dispatch, FIND, request)
  }
}

export function logout() {
  return (dispatch, getState) => {
    aService.clearSessionLocal()
    dispatch(push('/'))
    return dispatch({
      type: LOGOUT.start,
    })
  }
}

export function sessionRestore() {
  return (dispatch, getState) => {
    const payload = aService.restoreSessionLocal()
    if (payload) {
      dispatch(findById(payload.accountId))
      return dispatch({
        type: RESTORE.success,
        payload: payload, 
      })
    } else {
      return dispatch({
        type: RESTORE.failed,
        payload: new Error('Not found'), 
      })
    }
  }
}

