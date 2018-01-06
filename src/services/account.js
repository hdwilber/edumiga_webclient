import Service from './service'

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
}

export default Account
