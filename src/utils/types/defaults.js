import { buildImageUrl } from './../../redux/utils'
import { fakeId } from '../../utils/fake-id'
import { apiServices } from '../../services'

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


export function parseImage ({url}) {
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
    _parse: function (value) {
      console.log('Calling this')
      return value || fakeId()
    },
  },
  image: {
    file: BasicTypes.object,
    url: BasicTypes.string,
    fakeUrl: BasicTypes.string,
    _name: 'Image',
    _parse: function ({ url, ...rest }) {
      return {
        //...rest,
        fakeUrl: '',
        url: url && buildImageUrl(url),
        file: '',
      }
    },
    _build: function ({file, ...rest}) {
      return {
        ...rest,
        file,
      }
    },
    default: {
      file: null,
      url: '',
      fakeUrl: '',
    }
  }
}

export const Types = {
  ...BasicTypes,
  ...InstanceTypes,
}
