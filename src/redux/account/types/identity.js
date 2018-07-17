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
    _save: function toSave(services, data) {
      return (parent, options) => {
        const { id } = parent
        const { identity } = services
        const { file } = data
        const request = identity.uploadPhoto(id, file)
        return {
          name: Names.UPLOAD_PHOTO,
          request,
        }
      }
    }
  },
  _save: function (services, data) {
    return (parent, options) => {
      const { identity } = services
      const request = identity.update(data)
      return {
        name: Names.UPDATE,
        request,
      }
    }
  }
}

export default Type

