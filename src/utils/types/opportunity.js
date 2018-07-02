import { Types, defaultSpec } from './defaults'
import Course from './course'
import _ from 'lodash'
import * as OppActions from '../../redux/opportunity/actions'
import { apiServices } from '../../services'

const Specs = {
  id: defaultSpec.id,
  name: Types.string,
  duration: Types.number,
  description: Types.string,
  institution: {
    type: Types.object,
    parse: (data) => {
      return (data)
        ? { value: data.id, text: `${data.prename} ${data.name}`, ref: data }
        : null
    },
    build: (value) => {
      return value ? value.ref: null
    },
    save: {
      field: 'institutionId',
      value:  (value, built) => {
        return value ? value.value: null
      }
    }
  },
  regime: Types.string,
  published: {
    type: Types.bool,
    default: true,
  },
  type: Types.string,
  degrees: [Types.string],
  logo: {
    ...defaultSpec.image,
    save: function(value, data, options) {
      if(value.file && data && data.id) {
        const { id } = data
        return (options) => ({
          name: OppActions.UPLOAD_LOGO,
          request: apiServices.opportunity.uploadLogo(id, value.file),
          options,
        })
      }
    }
  },
  courses: {
    type: [Types.Course],
    spec: Course,
  },
  _save: function (isNew, instance) {
    if (isNew) {
      return (options) => ({
        name: OppActions.CREATE,
        request: apiServices.opportunity.create(instance)
      })
    }
    return (options) => ({
      name: OppActions.UPDATE,
      request: apiServices.opportunity.update(instance)
    })
  }
}

export default Specs
