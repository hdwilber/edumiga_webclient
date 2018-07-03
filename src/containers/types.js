import React from 'react'
import { OpportunityActions as Opportunity } from '../redux/opportunity/actions'
import { CourseActions as Course } from '../redux/course/actions'
import { InstitutionActions as Institution } from '../redux/institution/actions'

import { apiServices } from '../services'

export function createTypesManager() {
  const types = {
    institution: new Institution(apiServices),
    opportunity: new Opportunity(apiServices),
    course: new Course(apiServices),
  }

  return {
    ...types,
    setDispatch: function (dispatch) {
      Object.keys(types).forEach(name => {
        if (types[name]) {
          types[name].dispatch = dispatch
        }
      })
    }
  }
}
export const typesManager = createTypesManager()
export default React.createContext(typesManager)

