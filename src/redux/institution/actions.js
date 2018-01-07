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

export const FIND = {
  START: 'INSTITUTION_FIND',
  REJECTED: 'INSTITUTION_FIND_REJECTED',
  FULFILLED: 'INSTITUTION_FIND_FULFILLED',
}

const iService = new InstitutionService()

export function create(data) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.create(data)
    return handleRequest(dispatch, getState, CREATE.START, request)
  }
}

