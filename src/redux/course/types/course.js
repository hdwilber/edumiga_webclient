import Types from '../../defaults'
import { Names } from '../actions'

const Type = {
  id: Types.id,
  name: Types.string,
  code: Types.string,
  level: {
    ...Types.number,
    default: 1,
  },
  description: Types.string,
  duration: Types.number,
  published: {
    ...Types.bool,
    default: true,
  },
  optional: Types.bool,
  type: Types.string,
  prerequisites: [{
    ...Types.string,
    _format: function (value) {
      return value.id
    },
    _save: {
      beforeAll: function (value = [], oldValue = []) {
        const remove = []

          console.log('-----!!1')
          console.log(value)
          console.log(oldValue)

        oldValue.forEach(oval => {
          const exists = value.find(val => val === oval.id)
          if (!exists) {
            remove.push(oval.id)
          }
        })

        if (remove.length === 0) {
          return null
        }

        return (services, options, parent, { value, old, data } = {}) => {
          console.log('Before all func')
          console.log(parent)
          const { course } = services
          //const { data : { id } } = parent
          const { parent: courseParent } = parent
          const { values: { data: { id }} } = courseParent


          return {
            action: Names.DEL_PRE,
            request: course.delAllPrerequisites(id)
          }
        }
      },

      create: (value = [], oldValue = [], data) => {
        if(value)  {
          return (services, options, parent, { value, old, data } = {} ) => {
            console.log('Calling this one over her')
            console.log(parent)
            const { parent: { parent: courseParent } } = parent
            const { values: { data: { id }} } = courseParent
            console.log(courseParent)
            const { course } = services

            return {
              action: Names.ADD_PRE,
              request: course.addPrerequisite(id, value)
            }
          }
        }
        return null
      }
    }
  }],
}

export default Type

