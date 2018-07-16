import React from 'react'
import { Identity, Opportunity, Institution, Course } from '../../../redux'
import { apiServices } from '../../../services'
export { default as withTypesManager } from './withTypesManager'

export function createTypesManager() {
  const types = {
    identity: new Identity(apiServices),
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
