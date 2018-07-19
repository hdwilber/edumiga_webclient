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
    _save: function (data, oldData) {
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
  },
  courses: [{
    ...Course,
    _save: function(data, oldData) {
      console.log('Saving course: %o', data.name)
      return (parent, services, options) => {
        console.log(parent)
        const { id } = data
        const { course } = services
        const isNew = id.indexOf('fake') === 0
        console.log('with new oppo Id: %o', parent.id)
        const  request = isNew 
          ? course.create({...data, opportunityId: parent.id})
          : course.update(data)

        return {
          action: isNew ? Names.ADD_COURSE: Names.UPDATE_COURSE,
          request
        }
      }
    },
  }],
  _save: (data, oldData) => {
    const { id }  = data
    const isNew = id.indexOf('fake') === 0
    
    return (parent, services, options) => {
      const { opportunity } = services
      const request = opportunity.update(data)
      return {
        action: isNew ? Names.CREATE: Names.UPDATE,
        request,
      }
    }
  }
}

export default Type
