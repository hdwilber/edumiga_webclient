import { Types, defaultSpec } from './defaults'
import { buildImageUrl } from './../../redux/utils'

const Specs = {
  id: Types.string,
  name: Types.string,
  duration: Types.number,
  description: Types.string,
  regime: Types.string,
  published: {
    type: Types.boolean,
    default: true,
  },
  type: Types.string,
  degrees: Types.array.string,
  logo: defaultSpec.image,
  courses: {
    type: Types.array.object,
    build: function () {},
    save: function () {
    },
  }
}

export default Specs
