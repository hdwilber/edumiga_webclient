import { push } from 'react-router-redux'
import { InstitutionService } from '../../services'
import { dispatchRequestActions, handleRequestEmptyO, handleRequestO, createActionLabels, handleRequest,
} from '../utils'
import Institution from './types/institution'
import { saveData } from '../../utils/converters'
import BaseActions from '../base-actions'

export const GET_TYPES = createActionLabels('INST_GET_TYPES')
export const CREATE = createActionLabels('INST_CREATE')
export const LIST = createActionLabels('INST_LIST')
export const UPLOAD_LOGO = createActionLabels('INST_UPLOAD_LOGO')
export const FIND = createActionLabels('INST_FIND')
export const FIND_RESUME = createActionLabels('INST_FIND_RESUME')
export const FIND_ALL = createActionLabels('INST_FIND_ALL')
export const UPDATE = createActionLabels('INST_UPDATE')
export const DELETE = createActionLabels('INST_DELETE')
export const ADD_OPPORTUNITY = createActionLabels('INST_ADD_OPPORTUNITY')
export const REM_OPPORTUNITY = createActionLabels('INST_REM_OPPORTUNITY')
export const UNSET = 'INST_UNSET'
export const SET_CURRENT = 'INST_SET'
export const ADD_CATEGORY = createActionLabels('INST_ADD_CATEGORY')
export const DEL_CATEGORY = createActionLabels('INST_DEL_CATEGORY')

export const FULL_SAVING = createActionLabels('INST_FULL_SAVING')
export const SAVE = createActionLabels('INST_SAVE')

const iService = new InstitutionService()

class InstitutionActions extends BaseActions {
  constructor(services) {
    super(Institution, services)
    this.attachMethods()
  }

  findOne = function(id, options) {
    const { institution } = this.services
    const info  = {
      request: institution.get(id),
      name: FIND,
    }
    return info
  }
  
  delete = function(id, options) {
    const { opportunity } = this.services
    return {
      name: DELETE,
      request: opportunity.deletex(id)
    }
  }
}

export default InstitutionActions

export function save(data, options) {
  return (dispatch, getState) => {
    const result = saveData(Institution, data, options)
    const request = iService.update(result.savable)
    result.onHold.forEach(a => {
      switch(a.name) {
        case 'logo':
          const { value } = a
          if (value.file) {
            dispatch(uploadLogo(result.savable.id, value.file))
          }
          break;
      }
    })

    return dispatchRequestActions(dispatch, SAVE, request)
  }
}

export function unset() {
  return {
    type: UNSET,
  }
}

export function setCurrent(institution) {
  return {
    type: SET_CURRENT,
    payload: institution,
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
      },
      options)
  }
}

export function findAllOwnedResumes(options) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.getAllOwnedResumes()
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

export function findResumeById(id) {
  return (dispatch, getState) => {
    const { account } = getState()
    iService.setSession(account.session)
    const request = iService.getResume(id)

    return dispatchRequestActions(dispatch, FIND_RESUME, request, 
      {
        format: (data) => {
          return {
            ...data,
          }
        }
      }
    )
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
      //dispatch(oppFillData({
        //list: payload.institution.opportunities,
      //}))

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

export function addCategory(id, cat) {
  return (dispatch, getState) => {
    const { account } = getState
    iService.setSession(account.session)
    const request = iService.addCategory(id, cat.id)
    return dispatchRequestActions(dispatch, ADD_CATEGORY, request)
  }
}

