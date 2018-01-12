import Service from './service'

const LOCAL_STORAGE_NAME = 'EDUMIGA_SESSION'
class Account extends Service {
  constructor() {
    super('accounts')
  }

  create(data) {
    return this.createRequest('POST', '', data, false)
  }

  login(data) {
    return this.createRequest('POST', 'login', data, false)
  }

  storeSessionLocal(data) {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data))
  }

  restoreSessionLocal() {
    const session = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))
    return session
  }

  clearSessionLocal() {
    localStorage.removeItem(LOCAL_STORAGE_NAME)
  }
}

export default Account
