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
        console.log('Create something')
        const remove = []

        oldValue.forEach(oval => {
          const exists = value.find(val => val === oval.id)
          if (!exists) {
            remove.push(oval.id)
          }
        })

        if (remove.length === 0) {
          return null
        }

        return (services, options, parent, { value, old, data }) => {
          console.log('Before all func')
          console.log(parent)
          const { course } = services
          const { data : { id } } = parent

          return {
            action: Names.DEL_PRE,
            request: course.delAllPrerequisites(id)
          }
        }
      },

      create: (value = [], oldValue = [], data) => {
        console.log('HWOOOOOOCreate something 2')
        const add = []
        value.forEach(val => {
          const exists = oldValue.find(oval => val === oval.id)
          if (!exists) {
            add.push(val)
          }
        })

        console.log(add)
        if (add.length > 0) {
          return (services, options, parent, { value, old, data }) => {
            console.log('Calling this one over her')
            console.log(data)
            const { data: { id } } = parent
            const { course } = services

            return add.map(tid => ({
              action: Names.ADD_PRE,
              request: course.addPrerequisite(id, tid)
            }))
          }
        }
        return null
      }
    }
  }],
}

export default Type

