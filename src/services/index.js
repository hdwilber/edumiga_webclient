import React from 'react'
import AccountService from './account'
import IdentityService from './identity'
import InstitutionService from './institution'
import OpportunityService  from './opportunity'
import CourseService from './course'
import CategoryService from './category'
import Service from './service'

export function createApiServices() {
  const services = {
    identity: new IdentityService(),
    account: new AccountService(),
    institution: new InstitutionService(),
    opportunity: new OpportunityService(),
    course: new CourseService(),
    category: new CategoryService(),
  }
  return {
    ...services,
    setSession: function(session) {
      Object.keys(services).forEach(name => {
        services[name] && services[name].setSession(session)
      })
    }
  }
}

export const apiServices = createApiServices()

export default React.createContext(apiServices)
export { AccountService }
export { InstitutionService}
export { OpportunityService}
export { CourseService}
export { CategoryService}
export { Service }

