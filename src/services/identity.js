import Service from './service'

class Identity extends Service {
  constructor() {
    super('accountIdentities')
  }

  update(data) {
    return this.createRequest('PATCH',`${data.id}`, data)
  }

  uploadPhoto(id, file)  {
    return this.createUploadRequest(`${id}/uploadPhoto`, file)
  }

}

export default Identity
