import Service from './service'

class Institution extends Service {
  constructor() {
    super('institutions')
  }

  create(data) {
    return this.createRequest('POST', '', data, false )
  }

  get(id) {
    return this.createRequest('GET',`${id}`)
  }
  update(data) {
    return this.createRequest('PATCH',`${data.id}`, data)
  }

  getAll(filter = {}) {
    const defaultFilter = {
      include: ['account', 'mainLogo', 'media'],
      ...filter,
    }
    return this.createRequest('GET', `?${JSON.stringify(defaultFilter)}`, null, false)
  }
}

export default Institution
