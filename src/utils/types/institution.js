import { Types } from './defaults'
import * as InstActions from '../../redux/institution/actions'
import { apiServices } from '../../services'

const Type = {
  id: Types.id,
  prename: Types.string,
  name: Types.string,
  description: Types.string,
  published: Types.bool,
  type: Types.string,
  address: Types.string,
  country: Types.string,
  head: {
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
      field: 'parentId',
      value:  (value, built) => {
        return value ? value.value: null
      }
    }
  },
  state: Types.string,
  county: Types.string,
  phones: [Types.string],
  levels:  [Types.string],
  adminLevel: Types.string,
  location: {
    type: Types.object,
    default: {
      point: null,
      zoom: 10,
    }
  },
  logo: {
    ...Types.image,
    _save: function(value, data, options) {
      if(value.file && data && data.id) {
        const { id } = data
        return (parent, options) => {
          const { id } = parent
          if (id) {
            return {
              name: InstActions.UPLOAD_LOGO,
              request: apiServices.institution.uploadLogo(id, value.file),
              options,
            }
          }
          return null
        }
      }
    }
  },
  dependencies: [{
    _self: true,
    _build: function (data, options) {
    },
  }],
  opportunities: [{
    _build: function (data, options) {
    },
  }],
  categories: [{
    _parse: function (data) {
      return {
        text: data.name,
        value: data.id,
      }
    },
    _build: function (data, options) {
    },
    _save: (value, data, options) => {
      return (parent) => {
        const { id } = parent;
        if (id) {
          console.log(value)
          const newValue = value.value
          return {
            name: InstActions.ADD_CATEGORY,
            request: apiServices.institution.addCategory(id, newValue)
          }
        }
      }
    }
  }],
  _save: function (isNew, instance) {
    if (isNew) {
      return (parent, options) => ({
        name: InstActions.CREATE,
        request: apiServices.institution.create(instance)
      })
    }
    return (parent, options) => ({
      name: InstActions.UPDATE,
      request: apiServices.institution.update(instance)
    })
  }
}


export default Type

