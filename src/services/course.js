import Service from './service'

class Course extends Service {
  constructor() {
    super('courses')
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
          relation: 'opportunity',
        },
        {
          relation: 'logo',
        },
        {
          relation: 'prerequisites',
        }
      ],
      ...filter,
    }
    return this.createRequest('GET',`${id}/?filter=${JSON.stringify(defaultFilter)}`)
  }

  update(data) {
    return this.createRequest('PATCH',`${data.id}`, data)
  }

  deletex(id) {
    return this.createRequest('DELETE', `${id}`)
  }

  addPrerequisites(id, rid) {
    return this.createRequest('PUT', `${id}/prerequisites/rel/${rid}`)
  }

  delPrerequisite(id, rid) {
    return this.createRequest('DELETE', `${id}/prerequisites/rel/${rid}`)
  }
}

export default Course

