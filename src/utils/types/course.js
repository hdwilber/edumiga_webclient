import { Types, defaultSpec } from './defaults'
import * as CourseActions from '../../redux/course/actions'
import { apiServices } from '../../services'


const Specs = {
  id: defaultSpec.id,
  name: Types.string,
  code: Types.string,
  level: {
    type: Types.number,
    default: 1,
  },
  description: Types.string,
  duration: Types.number,
  published: {
    type: Types.bool,
    default: true,
  },
  optional: Types.bool,
  type: Types.string,
  prerequisites: {
    type: [Types.Prerequisite],
    parse: function (value) {
      return value.id
    },
    build: (value, data, { courses } ) => {
      return courses.find(c => c.id === value)
    },
    save: (value, data, options) => {
      const { id } = data
      if (id) {
        return () => ({
          name: CourseActions.ADD_PRE,
          request: apiServices.course.addPrerequisite(id, value.id)
        })
      }
      return null
    },
  },
  _save: function (isNew, instance) {
    if (isNew) {
      return (options) => ({
        name: CourseActions.CREATE,
        request: apiServices.course.create(instance)
      })
    }
    return (options) => ({
      name: CourseActions.UPDATE,
      request: apiServices.course.update(instance)
    })
  }
}

export default Specs

