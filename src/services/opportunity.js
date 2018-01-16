import Service from './service'

class Opportunity extends Service {
  constructor() {
    super('opportunities')
  }

  create(data) {
    return this.createRequest('POST', '', data, false )
  }

  get(id, filter={}) {
    const defaultFilter = {
      include: [
        {
          relation: 'account'
        },
        {
          relation: 'logo',
        },
        {
          relation: 'media',
        },
        {
          relation: 'courses',
          scope: {
            include: ['prerequisites']
          }
        }
      ],
      ...filter,
    }
    return this.createRequest('GET',`${id}/?filter=${JSON.stringify(defaultFilter)}`)
  }

  update(data) {
    return this.createRequest('PATCH',`${data.id}`, data)
  }

  uploadLogo(id, file)  {
    console.log('Service Opportunity')
    console.log(file)
    return this.createUploadRequest(`${id}/uploadLogo`, file)
  }

  getAll(filter = {}) {
    const defaultFilter = {
      include: ['account', 'institution', 'media' ],
      ...filter,
    }
    return this.createRequest('GET', `?${JSON.stringify(defaultFilter)}`, null, false)
  }

  addCourse(id, data) {
    return this.createRequest('POST', `${id}/courses`, data)
  }

  delCourse(id, cid) {
    return this.createRequest('DELETE', `${id}/courses/${cid}`)
  }
}

export default Opportunity 
