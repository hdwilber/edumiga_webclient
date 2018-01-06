import { AccountService } from '../../services'
import { handleRequest } from '../utils'

export const CREATE_ACCOUNT = {
  START: 'CREATE_ACCOUNT',
  REJECTED: 'CREATE_ACCOUNT_REJECTED',
  FULFILLED: 'CREATE_ACCOUNT_FULFILLED'
}

export const SESSION_LOGIN = {
  START: 'SESSION_LOGIN',
  REJECTED: 'SESSION_LOGIN_REJECTED',
  FULFILLED: 'SESSION_LOGIN_FULFILLED'
}

export const SESSION_LOGOUT = {
  START: 'SESSION_LOGOUT'
}

export const SESSION_RESTORE = {
  START: 'SESSION_RESTORE',
  REJECTED: 'SESSION_RESTORE_REJECTED',
  FULFILLED: 'SESSION_RESTORE_FULFILLED',
}

const aService = new AccountService()

export function create(data) {
  return (dispatch, getState) => {
    const request = aService.create(data)
    return handleRequest(dispatch, getState, CREATE_ACCOUNT.START, request)
  }
}

export function login(data) {
  return (dispatch, getState) => {
    const request = aService.login(data)
    return handleRequest(dispatch, getState, SESSION_LOGIN.START, request,
      (data) => {
        return {
          session: data,
        }
      })
  }
}

export function logout() {
  return {
    type: SESSION_LOGOUT.START,
  }
}
