import AccountService from './account'
import InstitutionService from './institution'
import OpportunityService  from './opportunity'
import CourseService from './course'
import CategoryService from './category'

function createServices(store) {
  const session = store.account.session

  const services = {
    account: new AccountService(),
    institution: new InstitutionService(),
    opportunity: new OpportunityService(),
    course: new ourseService(),
    category: new CategoryService(),
  }

  store.subscribe(() => {
    const state = store.getState()
    const { session: next } = state.account
    if (session != next ) {
      Object.keys(services).forEach(name => {
        services.[name] && services[name].setSession(current)
      })
    }
  })
}
