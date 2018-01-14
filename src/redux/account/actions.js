import { AccountService } from '../../services'
import { push } from 'react-router-redux'
import IdentityService from '../../services/identity'
import { handleRequest } from '../utils'

export const CREATE = {
  START: 'ACCOUNT_CREATE',
  REJECTED: 'ACCOUNT_CREATE_REJECTED',
  FULFILLED: 'ACCOUNT_CREATE_FAILED'
}

export const LOGIN = {
  START: 'SESSION_LOGIN',
  REJECTED: 'SESSION_LOGIN_REJECTED',
  FULFILLED: 'SESSION_LOGIN_FULFILLED'
}

export const LOGOUT = {
  START: 'SESSION_LOGOUT'
}

export const RESTORE = {
  START: 'SESSION_RESTORE',
  REJECTED: 'SESSION_RESTORE_REJECTED',
  FULFILLED: 'SESSION_RESTORE_FULFILLED',
}

export const FIND = {
  START: 'ACCOUNT_FIND',
  REJECTED: 'ACCOUNT_FIND_REJECTED',
  FULFILLED: 'ACCOUNT_FIND_FULFILLED',
}

export const IDENTITY_UPDATE = {
  START: 'IDENTITY_UPDATE',
  REJECTED: 'IDENTITY_UPDATE_REJECTED',
  FULFILLED: 'IDENTITY_UPDATE_FULFILLED',
}

export const UPLOAD_PHOTO = {
  START: 'IDENTITY_UPLOAD_PHOTO',
  REJECTED: 'IDENTITY_UPLOAD_PHOTO_REJECTED',
  FULFILLED: 'IDENTITY_UPLOAD_PHOTO_FULFILLED',
}

const aService = new AccountService()
const iService = new IdentityService()

export function create(data) {
  return (dispatch, getState) => {
    const request = aService.create(data)
    return handleRequest(dispatch, getState, CREATE.START, request)
  }
}

export function updateIdentity(data) {
  return (dispatch, getState) => {
    const { session } = getState().account
    iService.setSession(session)
    const request = iService.update(data)
    return handleRequest(dispatch, getState, IDENTITY_UPDATE.START, request)
  }
}

export function login(data) {
  return (dispatch, getState) => {
    const request = aService.login(data)
    return handleRequest(dispatch, getState, LOGIN.START, request,
      null,
      (payload) => {
        aService.storeSessionLocal(payload)
        dispatch(findById(payload.accountId))
        dispatch(push('/institutions'))
      })
  }
}

export function uploadPhoto(file) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.uploadPhoto(account.identity.id, file)
    return handleRequest(dispatch, getState, UPLOAD_PHOTO.START, request)
  }
}

export function findById(id) {
  return (dispatch, getState) => {
    const { account } = getState()
    aService.setSession(account.session)
    const request = aService.get(id)
    return handleRequest(dispatch, getState, FIND.START, request)
  }
}

export function logout() {
  return (dispatch, getState) => {
    aService.clearSessionLocal()
    dispatch(push('/'))
    return dispatch({
      type: LOGOUT.START,
    })
  }
}

export function sessionRestore() {
  return (dispatch, getState) => {
    const payload = aService.restoreSessionLocal()
    if (payload) {
      dispatch(findById(payload.accountId))
      return dispatch({
        type: RESTORE.FULFILLED,
        payload: payload, 
      })
    } else {
      return dispatch({
        type: RESTORE.REJECTED,
        payload: new Error('Not found'), 
      })
    }
  }
}

