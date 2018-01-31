import { push } from 'react-router-redux'
import { InstitutionService, OpportunityService } from '../../services'
import { handleRequestEmptyO, handleRequestO, createActionLabels, handleRequest, handleRequestEmpty } from '../utils'

export const GET_TYPES = createActionLabels('INST_GET_TYPES')
export const CREATE = createActionLabels('INST_CREATE')
export const LIST = createActionLabels('INST_LIST')
export const UPLOAD_LOGO = createActionLabels('INST_UPLOAD_LOGO')
export const FIND = createActionLabels('INST_FIND')
export const FIND_ALL = createActionLabels('INST_FIND_ALL')
export const UPDATE = createActionLabels('INST_UPDATE')
export const DELETE = createActionLabels('INST_DELETE')
export const ADD_OPPORTUNITY = createActionLabels('INST_ADD_OPPORTUNITY')
export const REM_OPPORTUNITY = createActionLabels('INST_REM_OPPORTUNITY')
export const ADD_DEPENDENCY = createActionLabels('INST_ADD_DEPENDENCY')
export const DEL_DEPENDENCY = createActionLabels('INST_DEL_DEPENDENCY')

const iService = new InstitutionService()
const oService = new OpportunityService()

export function getTypes() {
  return (dispatch, getState) => {
    const request = iService.getTypes()
    return handleRequest(dispatch, getState, GET_TYPES, request)
  }
}


export function create(data, options) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.create(data)
    return handleRequestO(dispatch, CREATE, request,
      {
        format: function(data) {
          return {
            institution: data,
            single: true,
          }
        }
      },
      options)
  }
}

export function update(data, options) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.update(data)
    return handleRequestO(dispatch, UPDATE, request, 
      {
        format: function(data) {
          return {
            institution: data,
            single: true,
          }
        }
      },
      options)
  }
}

export function deleteI(id, options) {
  return (dispatch, getState) => {
    const { account, institution } = getState()
    iService.setSession(account.session)

    const request = options && options.isDependency
      ? iService.delDependency(institution.current.id, id)
      : iService.deleteI(institution.current.id)
    return handleRequestEmptyO(dispatch, DELETE, request,
      {}, 
      {
        ...options,
        id: options && options.isDependency ? id: institution.current.id,
      })
  }
}



export function uploadLogo(id, file) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.uploadLogo(id, file)
    return handleRequest(dispatch, getState, UPLOAD_LOGO, request)
  }
}

export function findById(id, refresh = false) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.get(id)
    return handleRequest(dispatch, getState, FIND, request, 
    (data) => {
      return {
        institution: data,
        single: true,
      }
    },
    (payload) => {
      if (refresh) 
        dispatch(push(`/institution/${payload.id}/edit`))
    })
  }
}

export function findAll() {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.getAll()
    return handleRequest(dispatch, getState, FIND_ALL, request, 
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
    return handleRequest(dispatch, getState, ADD_OPPORTUNITY, request,
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

    return handleRequestEmpty(dispatch, getState, REM_OPPORTUNITY, request,
      { id: opp.id })
  }
}

