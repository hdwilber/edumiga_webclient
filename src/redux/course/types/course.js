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
      isAtomic: true,
      beforeAll: function (value = [], oldValue = []) {
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

        return (parent, services, options) => {
          const { course } = services
          const { id } = parent
          return {
            action: Names.DEL_PRE,
            request: course.delAllPrerequisites(id)
          }
        }
      },

      create: function (value = [], oldValue = []) {
        const add = []
        value.forEach(val => {
          const exists = oldValue.find(oval => val === oval.id)
          if (!exists) {
            add.push(val)
          }
        })

        if (add.length > 0) {
          return (services, options, parent) => {
            console.log('Calling this one')
            const { id } = parent
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

