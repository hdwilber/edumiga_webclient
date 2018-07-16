import Types from '../../defaults'
import Course from '../../course/types/course'

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
      field: 'institutionId',
      value:  (value, built) => {
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
  },
  courses: [Course],
}

export default Type
