import Types from '../../defaults'

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
    _format: (data) => {
      return (data) 
        ? { value: data.id, text: `${data.prename} ${data.name}`, ref: data }
        : null
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
    _format: function (data) {
      return {
        text: data.name,
        value: data.id,
      }
    },
  }],
}


export default Type

