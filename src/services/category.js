import Service from './service'

class Category extends Service {
  constructor() {
    super('categories')
  }

  getAll() {
    return this.createRequest('GET', 'list', null, false)
  }
}

export default Category
