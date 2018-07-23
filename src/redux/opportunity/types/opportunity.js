import Types from '../../defaults'
import Course from '../../course/types/course'
import { Names } from '../actions'

const Type = {
  _name: 'Opportunity',
  name: Types.string,
  id: Types.id,
  duration: Types.number,
  description: Types.string,
  institution: {
    default: null,
    _format: (data) => {
      return (data)
        ? { value: data.id, text: `${data.prename} ${data.name}`, ref: data }
        : null
    },
    _save: {
      name: 'institutionId',
      format:  (value) => {
        return value ? value.value: null
      },
      check: ({value}, oldValue) => {
        return (value !== oldValue.id)
      }
    }
  },
  regime: Types.string,
  published: {
    ...Types.bool,
    default: true,
  },
  type: Types.string,
  degrees: [Types.string],
  logo: {
    ...Types.image,
    _save: { 
      create: function (data, oldData) {
        const { file } = data
        if (file) {
          return (parent, services, options) => {
            const { id } = parent
            const { opportunity } = services
            const request = opportunity.uploadLogo(id, file)
            return {
              action: Names.UPLOAD_PHOTO,
              request,
            }
          }
        }
        return null
      }
    }
  },
  courses: [{
    ...Course,
    _save: {
      create: function(value, old, data) {
        console.log('Saving course: %o', old.name)
        return (parent, services, options) => {
          const { id } = data
          const { course } = services
          const isNew = id.indexOf('fake') === 0
          const  request = isNew 
            ? course.create({...data, opportunityId: parent.id})
            : course.update(data)

          return {
            action: isNew ? Names.ADD_COURSE: Names.UPDATE_COURSE,
            request
          }
        }
      },
    }
  }],
  _save: {
    create: (value, old, data) => {
      const { id }  = data
      if (id) {
        const isNew = id.indexOf('fake') === 0
        console.log('Opportunity will save: %o ', data)
        return (services, options, parent, ) => {
          const { opportunity } = services
          const request = opportunity.update(data)
          return {
            action: isNew ? Names.CREATE: Names.UPDATE,
            request,
          }
        }
      }
      return null
    }
  }
}

export default Type
