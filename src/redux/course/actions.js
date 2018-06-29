import { CourseService } from '../../services'
import { handleRequestEmptyO, handleRequestO,createActionLabels, handleRequest } from '../utils'
import { Course } from '../../utils/types'

import { TypeActions } from '../opportunity/actions'

const cService = new CourseService()

export const GET_TYPES = createActionLabels('COURSE_GET_TYPES')
export const SET = 'COURSE_SET'
export const CREATE  = createActionLabels('COURSE_CREATE')
export const UPDATE = createActionLabels('COURSE_UPDATE')
export const DELETE = createActionLabels('COURSE_DELETE')
export const LIST  = createActionLabels('COURSE_LIST')
export const UPLOAD_LOGO  = createActionLabels('COURSE_UPLOAD_LOGO')
export const FIND = createActionLabels('COURSE_FIND')
export const FIND_ALL = createActionLabels('COURSE_FIND_ALL')
export const ADD_PRE = createActionLabels('COURSE_ADD_PRE')
export const DEL_PRE = createActionLabels('COURSE_DEL_PRE')

export const FILL_DATA = 'COURSE_FILL_DATA'

export class CourseActions extends TypeActions {
  constructor(services) {
    super(Course, services)
    this.attachMethods()
  }
}

export function getTypes(type) {
  return (dispatch, getState) => {
    const request = cService.getTypes()
    return handleRequest(dispatch, getState, GET_TYPES, request)
  }
}


export function fillData(data) {
  return { 
    type: FILL_DATA,
    payload: data,
  }
}

export function set(id, options) {
  return {
    type: SET,
    payload: { id },
  }
}

export function create(data, options) {
  return (dispatch, getState) => {
    const { account } = getState()
    cService.setSession(account.session)
    const request = cService.create(data)
    return handleRequestO(dispatch, CREATE, request,
      {
        format: function(data) {
          return {
            course: data,
            single: true,
          }
        },
      },
      options)
  }
}

export function update(data, options) {
  return (dispatch, getState) => {
    const { account } = getState()
    cService.setSession(account.session)
    const request = cService.update(data)
    return handleRequestO(dispatch, UPDATE, request, 
      {
        format: function(data) {
          return {
            course: data,
            single: true,
          }
        }
      },
      options)
  }
}

export function addPrerequisite(id, rid, options) {
  return (dispatch, getState) => {
    const { account } = getState()
    cService.setSession(account.session)
    const request = cService.addPrerequisite(id, rid, options)
    return handleRequestEmptyO(dispatch, ADD_PRE, request, 
      {
      },
      options)
  }
}

export function uploadLogo(id, file) {
  return (dispatch, getState) => {
    const { account } = getState()
    cService.setSession(account.session)
    const request = cService.uploadLogo(id, file)
    return handleRequest(dispatch, getState, UPLOAD_LOGO, request)
  }
}

export function findById(id) {
  return (dispatch, getState) => {
    const { account } = getState()
    cService.setSession(account.session)
    const request = cService.get(id)
    return handleRequest(dispatch, getState, FIND, request, 
    (data) => {
      return {
        opportunity: data,
        single: true,
      }
    })
  }
}

export function deletex(id, options) {
  return (dispatch, getState) => {
    const { account } = getState()
    cService.setSession(account.session)
    const request = cService.deletex(id)
    return handleRequestEmptyO(dispatch, DELETE, request,
      {}, 
      {
        ...options,
        id,
      })
  }
}
