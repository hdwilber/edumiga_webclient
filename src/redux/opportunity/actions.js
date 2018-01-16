import { OpportunityService, CourseService } from '../../services'
import { handleRequest, handleRequestEmpty } from '../utils'

const oService = new OpportunityService()
const cService = new CourseService()

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

export const COURSE_ADD = {
  START: 'OPP_COURSE_ADD',
  REJECTED: 'OPP_COURSE_ADD_REJECTED',
  FULFILLED: 'OPP_COURSE_ADD_FULFILLED',
}

export const COURSE_DEL = {
  START: 'OPP_COURSE_DEL',
  REJECTED: 'OPP_COURSE_DEL_REJECTED',
  FULFILLED: 'OPP_COURSE_DEL_FULFILLED',
}

export const COURSE_UPDATE = {
  START: 'OPP_COURSE_UPDATE',
  REJECTED: 'OPP_COURSE_UPDATE_REJECTED',
  FULFILLED: 'OPP_COURSE_UPDATE_FULFILLED',
}

export const COURSE_SET = {
  START: 'OPP_COURSE_SET'
}

export const COURSE_ADD_PRE = {
  START: 'OPP_COURSE_ADD_PRE',
  REJECTED: 'OPP_COURSE_ADD_PRE_REJECTED',
  FULFILLED: 'OPP_COURSE_ADD_PRE_FULFILLED',
}

export const COURSE_DEL_PRE = {
  START: 'OPP_COURSE_DEL_PRE',
  REJECTED: 'OPP_COURSE_DEL_PRE_REJECTED',
  FULFILLED: 'OPP_COURSE_DEL_PRE_FULFILLED',
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

export function courseAdd(data) {
  return (dispatch, getState) => {
    const { account, opp} = getState()
    if (opp && opp.current) {
      oService.setSession(account.session)
      const request = oService.addCourse(opp.current.id, data)
      return handleRequest(dispatch, getState, COURSE_ADD.START, request)
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
      return handleRequestEmpty(dispatch, getState, COURSE_DEL.START, request,
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
      return handleRequest(dispatch, getState, COURSE_UPDATE.START, request,
        (data) => {
          return {
            course: data,
          }
        })
    }
  }
}

//export function courseAddPre(course, idpre) {
  //return (dispatch, getState) => {
    //const { account, opp} = getState()
    //if (opp && opp.current) {
      //oService.setSession(account.session)
      //const request = cService.addPrerequisite(course.id, idpre)
      //return handleRequest(dispatch, getState, COURSE_ADD_PRE.START, request)
    //}
  //}
//}

//export function courseDelPre(course, idpre) {
  //return (dispatch, getState) => {
    //const { account, opp} = getState()
    //if (opp && opp.current) {
      //oService.setSession(account.session)
      //const request = cService.delPrerequisite(course.id, idpre)
      //return handleRequest(dispatch, getState, COURSE_DEL_PRE.START, request)
    //}
  //}
//}

export function courseSet(course) {
  return {
    type: COURSE_SET.START,
    payload: course,
  }
}

