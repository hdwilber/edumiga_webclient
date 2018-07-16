import { buildImageUrl } from '../utils/image-url'
import { fakeId } from '../utils/fake-id'

export const BasicTypes = {
  bool: {
    default: false,
  },
  number: {
    default: 0,
  },
  string: {
    _name: 'Basic string',
    default: '',
  },
  object: {
    default: null,
  },
  date: {
    default: new Date(),
  },
}

export function setDefault(type) {
  return (type instanceof Array) ? [] : type.default
}


export function formatImage ({url}) {
  return {
    file: null,
    url: url && (buildImageUrl(url)),
    fakeUrl: '',
  }
}

export const InstanceTypes = {
  id: {
    ...BasicTypes.string,
    _name: 'Instance Id',
    _format: function (value) {
      console.log('Calling this')
      return value || fakeId()
    },
  },
  image: {
    file: BasicTypes.object,
    url: BasicTypes.string,
    fakeUrl: BasicTypes.string,
    _name: 'Image',
    _format: function ({ url, ...rest }) {
      return {
        //...rest,
        fakeUrl: '',
        url: url && buildImageUrl(url),
        file: '',
      }
    },
    default: {
      file: null,
      url: '',
      fakeUrl: '',
    }
  }
}

export default {
  ...BasicTypes,
  ...InstanceTypes,
}
