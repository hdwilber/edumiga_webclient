import { Types, defaultSpec } from './defaults'
import Course from './course'
import _ from 'lodash'

const Steps = {
  after: 10,
  before: 11,
  any: 12,
}

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
      return value ?value.ref: null
    },
    save: {
      field: 'institutionId',
      value:  (value, built) => value.value
    }
  },
  regime: Types.string,
  published: {
    type: Types.boolean,
    default: true,
  },
  type: Types.string,
  degrees: Types.array.string,
  logo: defaultSpec.image,
  courses: {
    type: Types.array.object,
    spec: Course,
    save: {
      order: 'after',
      action: (value, built, data, options) => {
        const { opportunity } = options
        if (opportunity) {
          const { courses } = opportunity
          //console.log(value)
          //console.log(courses)
          const toUpdate = []
          value.forEach( c => {
            const inOrigin = courses.find(course => course.id === c.id)
            if (inOrigin) {
              const equal = _.isEqual(inOrigin, c)
              if (!equal) {
                toUpdate.push(c)
              }
            } else {
              toUpdate.push(c)
            }
          })
          console.log(toUpdate)
          return toUpdate
        }
        return value
      }
    }
  }
}

export default Specs
