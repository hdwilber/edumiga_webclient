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
    console.log('Service institution')
    console.log(file)
    return this.createUploadRequest(`${id}/uploadLogo`, file)
  }

  getAll(filter = {}) {
    const defaultFilter = {
      include: ['account', 'mainLogo', 'media', 'opportunities'],
      ...filter,
    }
    return this.createRequest('GET', `?${JSON.stringify(defaultFilter)}`, null, false)
  }

  addOpportunity(id, data) {
    return this.createRequest('POST', `${id}/opportunities`, data)
  }

  remOpportunity(id, oid) {
    return this.createRequest('DELETE', `${id}/opportunities/${oid}`)
  }
}

export default Institution
