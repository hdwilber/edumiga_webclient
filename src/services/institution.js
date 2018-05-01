import Service from './service'

class Institution extends Service {
  constructor() {
    super('institutions')
  }

  create(data) {
    return this.createRequest('POST', '', data, true)
  }

  get(id, filter = {}) {
    const defaultFilter = {
      include: ['account', 'logo', 'media', 'dependencies', 'head',
        { relation: 'opportunities', 
          scope: {
            include: ['logo', 'account']
          }
        }],
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

  getAllOwned(filter = {}) {
    const defaultFilter = {
      where: {
        parentId: {
          exists: false,
        },
        adminLevel: 'main',
        accountId: this.session && this.session.accountId,
      },
      include: [
        {
          relation: 'account',
        },
        {
          relation: 'logo',
        },
        {
          relation: 'media',
        },
      ],

      ...filter,
    }
    return this.createRequest('GET', `?filter=${JSON.stringify(defaultFilter)}`, null, false)
  }


  getAll(filter = {}) {
    const defaultFilter = {
      where: {
        adminLevel: 'main',
      },
      include: [
        {
          relation: 'account',
        },
        {
          relation: 'logo',
        },
        {
          relation: 'media',
        },
        { relation: 'opportunities', 
          scope: {
            include: ['logo', 'account']
          }
        }
      ],
      ...filter,
    }
    return this.createRequest('GET', `?filter=${JSON.stringify(defaultFilter)}`, null, false)
  }

  addOpportunity(id, data) {
    return this.createRequest('POST', `${id}/opportunities`, data)
  }

  remOpportunity(id, oid) {
    return this.createRequest('DELETE', `${id}/opportunities/${oid}`)
  }

  getTypes() {
    return this.createRequest('GET', `/types`, null, false)
  }

  addDependency(id, data) {
    return this.createRequest('POST', `${id}/dependencies`, data)
  }

  delDependency(id, did) {
    return this.createRequest('DELETE', `${id}/dependencies/${did}`)
  }

  deleteI(id) {
    return this.createRequest('DELETE', `${id}`)
  }
}

export default Institution
