import { Types, defaultSpec } from './defaults'
import Course from './course'
import _ from 'lodash'
import * as OppActions from '../../redux/opportunity/actions'
import { apiServices } from '../../services'

const Type = {
  _name: 'Opportunity',
  name: Types.string,
  id: Types.id,
  duration: Types.number,
  description: Types.string,
  institution: {
    default: null,
    _parse: (data) => {
      return (data)
        ? { value: data.id, text: `${data.prename} ${data.name}`, ref: data }
        : null
    },
    _build: (value) => {
      return value ? value.ref: null
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
    _save: function(value, data, options) {
      if(value.file && data && data.id) {
        const { id } = data
        return (parent, options) => {
          const { id } = parent
          if (id) {
            return {
              name: OppActions.UPLOAD_LOGO,
              request: apiServices.opportunity.uploadLogo(id, value.file),
              options,
            }
          }
          return null
        }
      }
    }
  },
  courses: [Course],
  //_save: function (isNew, instance) {
    //if (isNew) {
      //return (parent, options) => ({
        //name: OppActions.CREATE,
        //request: apiServices.opportunity.create(instance)
      //})
    //}
    //return (parent, options) => ({
      //name: OppActions.UPDATE,
      //request: apiServices.opportunity.update(instance)
    //})
  //}
}

export default Type
