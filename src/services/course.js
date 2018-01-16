import Service from './service'

class Course extends Service {
  constructor() {
    super('courses')
  }

  update(data) {
    return this.createRequest('PATCH',`${data.id}`, data)
  }

  //addPrerequisites(id, data) {
    //return this.createRequest('POST', `${id}/prerequisiteslist`, data)
  //}

  //delPrerequisite(id, rid) {
    //return this.createRequest('DELETE', `${id}/prerequisites/rel/${rid}`)
  //}
}

export default Course

