import Service from './service'

class Course extends Service {
  constructor() {
    super('courses')
  }

  update(data) {
    return this.createRequest('PATCH',`${data.id}`, data)
  }

  addPrerequisite(id, rid) {
    return this.createRequest('PUT', `${id}/prerequisites/rel/${rid}`)
  }

  delPrerequisite(id, rid) {
    return this.createRequest('DELETE', `${id}/prerequisites/rel/${rid}`)
  }
}

export default Course

