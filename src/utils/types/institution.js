import { Types, defaultSpec } from './defaults'

const Specs = {
  id: Types.string,
  prename: Types.string,
  name: Types.string,
  description: Types.string,
  published: Types.bool,
  type: Types.string,
  address: Types.string,
  country: Types.string,
  head: {
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
      field: 'parentId',
      value:  (value, built) => value.value
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
  logo: defaultSpec.image,
  dependencies: {
    type: [Types.Institution],
    build: function (data, options) {
    },
  },
  opportunities: {
    type: [Types.Opportunity],
    build: function (data, options) {
    },
  },
  categories: {
    type: [Types.object],
    build: function (data, options) {
    },
  }
}

export default Specs

