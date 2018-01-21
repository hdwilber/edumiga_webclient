import { InstitutionService, OpportunityService } from '../../services'
import { handleRequest, handleRequestEmpty } from '../utils'

export const GET_TYPES = {
  START: 'INSTITUTION_GET_TYPES',
  REJECTED: 'INSTITUTION_GET_TYPES_REJECTED',
  FULFILLED: 'INSTITUTION_GET_TYPES_FULFILLED',
}

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

export const ADD_OPPORTUNITY = {
  START: 'INSTITUTION_ADD_OPPORTUNITY',
  REJECTED: 'INSTITUTION_ADD_OPPORTUNITY_REJECTED',
  FULFILLED: 'INSTITUTION_ADD_OPPORTUNITY_FULFILLED',
}

export const REM_OPPORTUNITY = {
  START: 'INSTITUTION_REM_OPPORTUNITY',
  REJECTED: 'INSTITUTION_REM_OPPORTUNITY_REJECTED',
  FULFILLED: 'INSTITUTION_REM_OPPORTUNITY_FULFILLED',
}

const iService = new InstitutionService()
const oService = new OpportunityService()

export function getTypes() {
  return (dispatch, getState) => {
    const request = iService.getTypes()
    return handleRequest(dispatch, getState, GET_TYPES.START, request)
  }
}


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

export function uploadLogo(id, file) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.uploadLogo(id, file)
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

export function addOpportunity(opp = null, data) {
  return (dispatch, getState) => {
    const { account, institution } = getState()
    var request = null
    if (opp) {
      oService.setSession(account.session)
      request = oService.update({
        ...data, id: opp.id
      })
    } else {
      iService.setSession(account.session)
      request = iService.addOpportunity(institution.current.id,data)
    }
    return handleRequest(dispatch, getState, ADD_OPPORTUNITY.START, request,
      data => {
        return {
          opp: data,
          isNewInstance: !opp,
        }
      })
  }
}

export function removeOpportunity(opp) {
  return (dispatch, getState) => {
    const { account, institution } = getState()
    
    iService.setSession(account.session)
    const request = iService.remOpportunity(institution.current.id, opp.id)

    return handleRequestEmpty(dispatch, getState, REM_OPPORTUNITY.START, request,
      { id: opp.id })
  }
}
