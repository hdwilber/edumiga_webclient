import { Types } from './defaults'

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
    type: Types.bool,
    default: true,
  },
  optional: Types.bool,
  type: Types.string,
  prerequisites: {
    type: [Types.Prerequisite],
    parse: function (data = []) {
      return data.map(c => c.id)
    },
    build: (value, data, { courses } ) => {
      return value.map(val => courses.find(c => c.id === val))
    },
  }
}

export default Specs
