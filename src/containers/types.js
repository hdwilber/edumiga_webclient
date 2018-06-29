import React from 'react'
import { OpportunityActions as Opportunity } from '../redux/opportunity/actions'

import { apiServices } from '../services'

export function createTypesManager() {
  const types = {
    opportunity: new Opportunity(apiServices),
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

