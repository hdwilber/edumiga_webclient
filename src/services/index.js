import AccountService from './account'
import InstitutionService from './institution'
import OpportunityService  from './opportunity'
import CourseService from './course'
import CategoryService from './category'
import Service from './service'

export function createServices() {
  const services = {
    account: new AccountService(),
    institution: new InstitutionService(),
    opportunity: new OpportunityService(),
    course: new CourseService(),
    category: new CategoryService(),
  }
  return {
    services,
    setSession: function(session) {
      Object.keys(services).forEach(name => {
        services[name] && services[name].setSession(session)
      })
    }
  }

}

export { AccountService }
export { InstitutionService}
export { OpportunityService}
export { CourseService}
export { CategoryService}
export { Service }

