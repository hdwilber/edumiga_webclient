import { Types, defaultSpec } from './defaults'
import { buildImageUrl } from './../../redux/utils'

const Specs = {
  id: Types.string,
  prename: Types.string,
  name: Types.string,
  description: Types.string,
  published: Types.boolean,
  type: Types.string,
  address: Types.string,
  country: Types.string,
  state: Types.string,
  county: Types.string,
  phones: Types.array.string,
  levels:  Types.array.string,
  adminLevel: Types.string,
  location: {
    type: Types.object,
    default: {
      point: null,
      zoom: 10,
    }
  },
  logo: defaultSpec.image,
  head: {
    build: function (data, options) {
    },
    save: () => {},
    type: Types.object,
  },
  dependencies: {
    type: Types.array.object,
    build: function (data, options) {
    },
    save: () => {},
  },
  categories: {
    type: Types.array.object,
    build: function (data, options) {
    },
    save: function (data, options) {
    }
  }
}

export default Specs

