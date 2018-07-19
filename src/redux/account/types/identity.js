import Types from '../../defaults'
import { Names } from '../actions'

const Type = {
  id: Types.string,
  displayName: Types.string,
  title: Types.string,
  firstName: Types.string,
  lastName: Types.string,
  birthDate: Types.date,
  occupation: Types.string,
  country: Types.string,
  state: Types.string,
  county: Types.string,
  address: Types.string,
  phones: [Types.string],
  interests: [Types.string],
  location: {
    ...Types.object,
    default: {
      point: null,
      zoom: 10,
    },
  },
  photo: {
    ...Types.image,
    _save: function (data, oldData) {
      const { file } = data
      if (file) {
        return (parent, services, options) => {
          const { id } = parent
          const { identity } = services
          const request = identity.uploadPhoto(id, file)
          return {
            action: Names.UPLOAD_PHOTO,
            request,
          }
        }
      }
      return null
    }
  },
  _save: function (data, oldData) {
    return (parent, services, options) => {
      const { identity } = services
      const request = identity.update(data)
      return {
        action: Names.UPDATE,
        request,
      }
    }
  }
}

export default Type

