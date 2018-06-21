import { Types, defaultSpec } from './defaults'
import Course from './course'
import _ from 'lodash'

const Specs = {
  id: Types.string,
  name: Types.string,
  duration: Types.number,
  description: Types.string,
  institution: {
    type: Types.object,
    parse: (data) => {
      return (data)
        ? { value: data.id, text: `${data.prename} ${data.name}`, ref: data }
        : null
    },
    build: (value) => {
      return value ? value.ref: null
    },
    save: {
      field: 'institutionId',
      value:  (value, built) => {
        return value.value
      }
    }
  },
  regime: Types.string,
  published: {
    type: Types.bool,
    default: true,
  },
  type: Types.string,
  degrees: [Types.string],
  logo: defaultSpec.image,
  courses: {
    type: [Types.Course],
    spec: Course,
    save: function (value, data, options) {
      return value
    }
  }
}

export default Specs
