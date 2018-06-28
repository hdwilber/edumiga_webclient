import { Types } from './defaults'
import * as CourseActions from '../../redux/course/actions'

const Specs = {
  id: Types.string,
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
        return (service, options) => ({
          name: CourseActions.ADD_PRE,
          request: service.addPrerequisite(id, value.id)
        })
      }
    },
  }
}

export default Specs

