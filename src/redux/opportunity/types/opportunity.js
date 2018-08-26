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
      check: (value, oldValue) => {
        if (!value && !oldValue) {
          return false
        }
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
      create: function (value, old, data) {
        const { file } = data
        if (file) {
          return (services, options, parent, { value, old, data }, results) => {
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
        if (Object.keys(data).length === 1)
          return null
        return (services, options, parent ) => {
          const { id } = data
          const { course } = services
          const isNew = id.indexOf('fake') === 0
          let oppId

          if (parent) {
            const { parent: { parent: oppParent } } = parent
            if (oppParent.values.save && oppParent.values.save.id) {
              oppId = oppParent.values.save.id
            }
            else if (oppParent.values.value && oppParent.values.value.id)
              oppId = oppParent.values.value.id
            else if (oppParent.values.old && oppParent.values.old.id)
              oppId = oppParent.values.old.id

          }
          if (isNew) {
            delete data.id
          }

          const request = isNew 
            ? course.create({...data, opportunityId: oppId})
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

      if (Object.keys(data).length === 1)
        return null

      const { id }  = data
      if (id) {
        const isNew = id.indexOf('fake') === 0
        console.log('Opportunity will save: %o ', data)
        return (services, options, parent,  { value, old, data }, results) => {
          console.log('Data: %o', data)
          const { opportunity } = services
          const request = opportunity.update(data)
          return {
            action: isNew ? Names.CREATE : Names.UPDATE,
            request,
          }
        }
      }
      return null
    }
  }
}

export default Type
