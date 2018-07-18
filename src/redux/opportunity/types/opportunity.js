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
        console.log('Instituttionasfsdkfjalsdkfjaskf')
        console.log(value)
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
    _save: function (services, data) {
      const { file } = data
      if (file) {
        return (parent, options) => {
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
  courses: [Course],
  _save: (services, data) => {
    const { id }  = data
    const isNew = id.indexOf('fake') === 0
    
    return (parent, options) => {
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
