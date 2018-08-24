import { createActionLabels } from '../utils'

import BaseActions from '../base-actions'
import Opportunity from './types/opportunity'

export const Names = {
  FIND: createActionLabels('Opp/Find'),
  CREATE: createActionLabels('Opp/Create'),
  UPDATE: createActionLabels('Opp/Update'),
  DELETE: createActionLabels('Opp/Delete'),
  GET_TYPES: createActionLabels('Opp/GetTypes'),
  UPLOAD_LOGO: createActionLabels('Opp/UploadLogo'),
  ADD_COURSE: createActionLabels('Opp/AddCourse'),
  UPDATE_COURSE: createActionLabels('Opp/UpdateCourse'),
}

export const GET_TYPES = createActionLabels('OPP_GET_TYPES')
export const CREATE  = createActionLabels('OPP_CREATE')
export const LIST  = createActionLabels('OPP_LIST')
export const UPLOAD_LOGO  = createActionLabels('OPP_UPLOAD_LOGO')
export const FIND = createActionLabels('OPP_FIND')
export const FIND_ALL = createActionLabels('OPP_FIND_ALL')
export const UPDATE = createActionLabels('OPP_UPDATE')
export const DELETE = createActionLabels('OPP_DELETE')
export const COURSE_ADD = createActionLabels('OPP_COURSE_ADD')
export const COURSE_DEL = createActionLabels('OPP_COURSE_DEL')
export const COURSE_UPDATE = createActionLabels('OPP_COURSE_UPDATE')
export const COURSE_SET = createActionLabels('OPP_COURSE_SET')
export const COURSE_ADD_PRE = createActionLabels('OPP_COURSE_ADD_PRE')
export const COURSE_DEL_PRE = createActionLabels('OPP_COURSE_DEL_PRE')
export const SAVE = createActionLabels('SAVE')


export const SET = 'OPP_SET'
export const FILL_DATA = 'OPP_FILL_DATA'

class OpportunityActions extends BaseActions {
  constructor(services) {
    super(Opportunity, services)
    this.attachMethods()
  }

  findOne = function(id, options) {
    const { opportunity } = this.services
    const info  = {
      request: opportunity.get(id),
      name: Names.FIND,
    }
    return info
  }

  getTypes = function () {
    const { opportunity } = this.services
    const info = {
      request: opportunity.getTypes(),
      name: Names.GET_TYPES
    }
    return info
  }

  delete = function(id, options) {
    const { opportunity } = this.services
    return {
      name: Names.DELETE,
      request: opportunity.deletex(id)
    }
  }
}

export default OpportunityActions

