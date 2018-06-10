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
  getResume(id) {
    return this.createRequest('GET', `${id}/resume`, null, false)
  }
  update(data) {
    return this.createRequest('PATCH',`${data.id}`, data)
  }

  uploadLogo(id, file)  {
    return this.createUploadRequest(`${id}/uploadLogo`, file)
  }

  getAllOwnedResumes() {
    return this.createRequest('GET', `owned`)
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
        },
        { relation: 'dependencies', 
          scope: {
            include: [
              { relation: 'dependencies',
                scope: {
                  include: [
                    { relation: 'dependencies'},
                    { relation: 'opportunities'},
                  ],
                }
              },
              { relation: 'opportunities', },
            ]
          }
        }
      ],
      ...filter,
    }
    return this.createRequest('GET', `?filter=${JSON.stringify(defaultFilter)}`, null, false)
  }

  getAllResumes(owned = false) {
    let filter = {}
    if (owned) {
      const filter = {
        where: {
          parentId: {
            exists: false,
          },
          adminLevel: 'main',
          accountId: this.session && this.session.accountId,
        },
      }
    }
    return this.createRequest('GET', `resumes?filter=${JSON.stringify(filter)}`, null, false)
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

  addCategory(id, cid) {
    return this.createRequest('PUT', `${id}/categories/rel/${cid}`)
  }
  delCategory(id, cid) {
    return this.createRequest('DELETE', `${id}/categories/rel/${cid}`)
  }
}

export default Institution
