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
      create: function (value = [], oldValue = []) {
        const add = []
        const remove = []

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

        if (add.length === 0 && remove.length === 0) {
          return null
        }

        return (parent, services, options) => {
          const { id } = parent
          const { course } = services

          const main = add.map(e => ({
            action: Names.ADD_PRE,
            request: course.addPrerequisite(id, e)
          }))

          if (remove.length === 0) {
            return main
          } else {
            const first = [{
              action: Names.DEL_PRE,
              request: course.delAllPrerequisites(id)
            }]
            console.log('A complete one')
            console.log(first.concat(main))
            return first.concat(main)
          }
        }
      }
    }
  }],
}

export default Type

