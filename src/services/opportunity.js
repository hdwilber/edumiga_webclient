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
          relation: 'institution',
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
            include: [
              {
                relation: 'prerequisites',
                scope: {
                  fields: ['id'],
                }
              }
            ],
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

  getTypes(type) {
    return this.createRequest('GET', `types`, null, false)
  }
  deletex(id) {
    return this.createRequest('DELETE', `${id}`)
  }
}

export default Opportunity 
