import { InstitutionService } from '../../services'
import { handleRequest } from '../utils'

export const CREATE = {
  START: 'INSTITUTION_CREATE',
  REJECTED: 'INSTITUTION_CREATE_REJECTED',
  FULFILLED: 'INSTITUTION_CREATE_FULFILLED',
}

export const LIST = {
  START: 'INSTITUTION_LIST',
  REJECTED: 'INSTITUTION_LIST_REJECTED',
  FULFILLED: 'INSTITUTION_LIST_FULFILLED',
}

export const UPLOAD_LOGO = {
  START: 'INSTITUTION_UPLOAD_LOGO',
  REJECTED: 'INSTITUTION_UPLOAD_LOGO_REJECTED',
  FULFILLED: 'INSTITUTION_UPLOAD_LOGO_FULFILLED',
}

export const FIND = {
  START: 'INSTITUTION_FIND',
  REJECTED: 'INSTITUTION_FIND_REJECTED',
  FULFILLED: 'INSTITUTION_FIND_FULFILLED',
}

export const FIND_ALL = {
  START: 'INSTITUTION_FIND_ALL',
  REJECTED: 'INSTITUTION_FIND_ALL_REJECTED',
  FULFILLED: 'INSTITUTION_FIND_ALL_FULFILLED',
}
export const UPDATE = {
  START: 'INSTITUTION_UPDATE',
  REJECTED: 'INSTITUTION_UPDATE_REJECTED',
  FULFILLED: 'INSTITUTION_UPDATE_FULFILLED',
}

const iService = new InstitutionService()

export function create(data) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.create(data)
    return handleRequest(dispatch, getState, CREATE.START, request,
      (data) => {
        return {
          institution: data,
          single: true,
        }
      })
  }
}

export function update(data) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.update(data)
    return handleRequest(dispatch, getState, UPDATE.START, request, 
    (data) => {
      return {
        institution: data,
        single: true,
      }
    })
  }
}

export function uploadLogo(file) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.uploadLogo(file)
    return handleRequest(dispatch, getState, UPLOAD_LOGO.START, request)
  }
}

export function findById(id) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.get(id)
    return handleRequest(dispatch, getState, FIND.START, request, 
    (data) => {
      return {
        institution: data,
        single: true,
      }
    })
  }
}

export function findAll() {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.getAll()
    return handleRequest(dispatch, getState, FIND_ALL.START, request, 
    (data) => {
      return {
        list: data,
        single: true,
      }
    })
  }
}
