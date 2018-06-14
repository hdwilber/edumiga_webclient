import { Types, parseImage, } from './defaults'
import { buildImageUrl } from './../../redux/utils'

const Specs = {
  id: Types.string,
  name: Types.string,
  code: Types.string,
  level: {
    type: Types.number,
    default: 1,
  },
  description: Types.string,
  duration: Types.number,
  published: {
    type: Types.boolean,
    default: true,
  },
  optional: Types.boolean,
  type: Types.string,
  prerequisites: {
    type: Types.array.object,
    parse: function (data = [], options = {}) {
      return data.map(c => c.id)
    },
    save: function () {},
  }
}

export default Specs
