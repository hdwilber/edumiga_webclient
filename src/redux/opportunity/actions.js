import { OpportunityService, CourseService } from '../../services'
import { handleRequestO,createActionLabels, handleRequest, handleRequestEmpty } from '../utils'

const oService = new OpportunityService()
const cService = new CourseService()

export const GET_TYPES = createActionLabels('OPP_GET_TYPES')
export const CREATE  = createActionLabels('OPP_CREATE')
export const LIST  = createActionLabels('OPP_LIST')
export const UPLOAD_LOGO  = createActionLabels('OPP_UPLOAD_LOGO')
export const FIND = createActionLabels('OPP_FIND')
export const FIND_ALL = createActionLabels('OPP_FIND_ALL')
export const UPDATE = createActionLabels('OPP_UPDATE')
export const COURSE_ADD = createActionLabels('OPP_COURSE_ADD')
export const COURSE_DEL = createActionLabels('OPP_COURSE_DEL')
export const COURSE_UPDATE = createActionLabels('OPP_COURSE_UPDATE')
export const COURSE_SET = createActionLabels('OPP_COURSE_SET')
export const COURSE_ADD_PRE = createActionLabels('OPP_COURSE_ADD_PRE')
export const COURSE_DEL_PRE = createActionLabels('OPP_COURSE_DEL_PRE')

export function getTypes(type) {
  return (dispatch, getState) => {
    const request = oService.getTypes()
    return handleRequest(dispatch, getState, GET_TYPES, request)
  }
}

export function create(data, options) {
  return (dispatch, getState) => {
    const { account } = getState()
    oService.setSession(account.session)
    const request = oService.create(data)
    return handleRequestO(dispatch, CREATE, request,
      {
        format: function(data) {
          return {
            opportunity: data,
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
    oService.setSession(account.session)
    const request = oService.update(data)
    return handleRequestO(dispatch, UPDATE, request, 
      {
        format: function(data) {
          return {
            opportunity: data,
            single: true,
          }
        }
      },
      options)
  }
}

export function uploadLogo(id, file) {
  return (dispatch, getState) => {
    const { account } = getState()
    oService.setSession(account.session)
    const request = oService.uploadLogo(id, file)
    return handleRequest(dispatch, getState, UPLOAD_LOGO, request)
  }
}

export function findById(id) {
  return (dispatch, getState) => {
    const { account } = getState()
    oService.setSession(account.session)
    const request = oService.get(id)
    return handleRequest(dispatch, getState, FIND, request, 
    (data) => {
      return {
        opportunity: data,
        single: true,
      }
    })
  }
}

export function courseAdd(data) {
  return (dispatch, getState) => {
    const { account, opp} = getState()
    if (opp && opp.current) {
      oService.setSession(account.session)
      const request = oService.addCourse(opp.current.id, data)
      return handleRequest(dispatch, getState, COURSE_ADD, request)
    } else {
      return dispatch({
        type: COURSE_ADD.REJECTED,
        payload: 'eRROR'
      })
    }
  }
}

export function courseDel(id) {
  return (dispatch, getState) => {
    const { account, opp} = getState()
    if (opp && opp.current) {
      oService.setSession(account.session)
      const request = oService.delCourse(opp.current.id, id)
      return handleRequestEmpty(dispatch, getState, COURSE_DEL, request,
        id,
      )
    }
  }
}

export function courseUpdate(data) {
  return (dispatch, getState) => {
    const { account, opp } = getState()
    if (opp && opp.current) {
      cService.setSession(account.session)
      const request = cService.update(data)
      return handleRequest(dispatch, getState, COURSE_UPDATE, request)
    }
  }
}

export function courseSet(course) {
  return {
    type: COURSE_SET,
    payload: course,
  }
}

