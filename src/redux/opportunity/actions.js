import { OpportunityService } from '../../services'
import { handleRequest, handleRequestEmpty } from '../utils'

const oService = new OpportunityService()

export const CREATE = {
  START: 'OPPORTUNITY_CREATE',
  REJECTED: 'OPPORTUNITY_CREATE_REJECTED',
  FULFILLED: 'OPPORTUNITY_CREATE_FULFILLED',
}

export const LIST = {
  START: 'OPPORTUNITY_LIST',
  REJECTED: 'OPPORTUNITY_LIST_REJECTED',
  FULFILLED: 'OPPORTUNITY_LIST_FULFILLED',
}

export const UPLOAD_LOGO = {
  START: 'OPPORTUNITY_UPLOAD_LOGO',
  REJECTED: 'OPPORTUNITY_UPLOAD_LOGO_REJECTED',
  FULFILLED: 'OPPORTUNITY_UPLOAD_LOGO_FULFILLED',
}

export const FIND = {
  START: 'OPPORTUNITY_FIND',
  REJECTED: 'OPPORTUNITY_FIND_REJECTED',
  FULFILLED: 'OPPORTUNITY_FIND_FULFILLED',
}

export const FIND_ALL = {
  START: 'OPPORTUNITY_FIND_ALL',
  REJECTED: 'OPPORTUNITY_FIND_ALL_REJECTED',
  FULFILLED: 'OPPORTUNITY_FIND_ALL_FULFILLED',
}
export const UPDATE = {
  START: 'OPPORTUNITY_UPDATE',
  REJECTED: 'OPPORTUNITY_UPDATE_REJECTED',
  FULFILLED: 'OPPORTUNITY_UPDATE_FULFILLED',
}

export function create(data) {
  return (dispatch, getState) => {
    const { account } = getState()
    oService.setSession(account.session)
    const request = oService.create(data)
    return handleRequest(dispatch, getState, CREATE.START, request,
      (data) => {
        return {
          opportunity: data,
          single: true,
        }
      })
  }
}

export function update(data) {
  return (dispatch, getState) => {
    const { account } = getState()
    oService.setSession(account.session)
    const request = oService.update(data)
    return handleRequest(dispatch, getState, UPDATE.START, request, 
    (data) => {
      return {
        opportunity: data,
        single: true,
      }
    })
  }
}

export function uploadLogo(id, file) {
  return (dispatch, getState) => {
    const { account } = getState()
    oService.setSession(account.session)
    const request = oService.uploadLogo(id, file)
    return handleRequest(dispatch, getState, UPLOAD_LOGO.START, request)
  }
}

export function findById(id) {
  return (dispatch, getState) => {
    const { account } = getState()
    oService.setSession(account.session)
    const request = oService.get(id)
    return handleRequest(dispatch, getState, FIND.START, request, 
    (data) => {
      return {
        opportunity: data,
        single: true,
      }
    })
  }
}

