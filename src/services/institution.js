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

  uploadLogo(id, file)  {
    return this.createUploadRequest(`${id}/uploadMedia`, file)
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
