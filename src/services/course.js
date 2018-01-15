import Service from './service'

class Course extends Service {
  constructor() {
    super('courses')
  }

  update(data) {
    return this.createRequest('PATCH',`${data.id}`, data)
  }
}

export default Course

