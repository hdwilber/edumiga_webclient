import { Types, defaultSpec } from './defaults'
import Course from './course'
import _ from 'lodash'
import * as OppActions from '../../redux/opportunity/actions'

const Specs = {
  id: Types.string,
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
        return value.value
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
      if(value.file) {
        const { id } = data
        return (service, options) => ({
          name: OppActions.UPLOAD_LOGO,
          request: service.uploadLogo(id, value.file),
          options,
        })
      }
    }
  },
  courses: {
    type: [Types.Course],
    spec: Course,
  }
}

export default Specs
