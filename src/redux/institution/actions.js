import { push } from 'react-router-redux'
import { InstitutionService } from '../../services'
import { dispatchRequestActions, handleRequestEmptyO, handleRequestO, createActionLabels, handleRequest } from '../utils'
import { fillData as oppFillData } from '../opportunity/actions'

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
export const UNSET = 'INST_UNSET'

const iService = new InstitutionService()

export function unset() {
  return {
    type: UNSET,
  }
}

export function getTypes() {
  return (dispatch, getState) => {
    const request = iService.getTypes()
    return handleRequest(dispatch, getState, GET_TYPES, request)
  }
}

export function findAllOwned(options) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.getAllOwned()
    return dispatchRequestActions(dispatch, FIND_ALL, request,
      {
        format: function(data) {
          return {
            ...data,
            single: true,
          }
        }
      },
      options)
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
      : iService.deleteI(id)
    return handleRequestEmptyO(dispatch, DELETE, request,
      {}, 
      {
        ...options,
        id,
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
      dispatch(oppFillData({
        list: payload.institution.opportunities,
      }))

      if (refresh) 
        dispatch(push(`/institution/${payload.id}/edit`))
    })
  }
}

export function findAllResumes() {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.getAllResumes()
    return dispatchRequestActions(dispatch, FIND_ALL, request, 
      {
        format: (data) => {
          return {
            ...data,
            single: true,
          }
        }
      }
    )
  }
}

