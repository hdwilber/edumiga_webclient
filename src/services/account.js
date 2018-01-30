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

  confirm(uid, token) {
    return this.createRequest('GET', `confirm?uid=${uid}&token=${token}`, null, false)
  }

  reConfirm() {
    return this.createRequest('GET', `reconfirm`, null, true)
  }

  get(id, filter={}) {
    const defaultFilter = {
      include: [{
        relation: 'identities',
        scope: {
          include: ['photo']
        },
      }], 
      ...filter,
    }

    return this.createRequest('GET', `${id}?filter=${JSON.stringify(defaultFilter)}`)
  }

  uploadPhoto(id, file)  {
    return this.createUploadRequest(`${id}/uploadLogo`, file)
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
