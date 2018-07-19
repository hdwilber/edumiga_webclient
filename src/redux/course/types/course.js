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
    _preSaveAll: function (value, oldValue = []) {
      const remove = []
      const add = []

      value.forEach(val => {
        const exists = oldValue.find(oval => val === oval.id)
        if (!exists) {
          add.push(val)
        }
      })

      oldValue.forEach(oval => {
        const exists = value.find(val => val === oval.id)
        if (!exists) {
          remove.push(oval.id)
        }
      })
      return {
        remove,
        add,
      }
    },
    _save: function (value, oldValue, preValue) {
      const remove = preValue.remove.find(pv => value === pv)
      const add = preValue.add.find(pv => value === pv)

      if (add && !remove) {
        return function(parent, services, options) {
          const { id } = parent
          const { course } = services
          return {
            action: Names.ADD_PRE,
            request: course.addPrerequisite(id, value),
          }
        }
      } else if (!add && remove) {
        return function(parent, services, options) {
          const { id } = parent
          const { course } = services
          return {
            action: Names.DEL_PRE,
            request: course.delPrerequisite(id, value),
          }
        }
      }
      return null
    },
  }],
}

export default Type

