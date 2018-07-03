import { buildImageUrl } from './../../redux/utils'
import { fakeId } from '../../utils/fake-id'
import { apiServices } from '../../services'

export const Types = {
  bool: {
    id: 1,
    default: false,
  },
  number: {
    id: 2,
    default: 0,
  },
  string: {
    id: 3,
    default: '',
  },
  object: {
    id: 4,
    default: null,
  },
  date: {
    id: 20,
    default: new Date(Date.now()),
  },

  Institution: {
    id: 100,
    default: null
  },
  Opportunity: {
    id: 200,
    default: null
  },
  Course: {
    id: 300,
    default: null
  },
  Prerequisite: {
    id: 350,
    default: null
  },
  Logo: {
    id: 400,
    default: null,
  }
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

export const defaultSpec = {
  id: {
    type: Types.string,
    parse: function (value) {
      console.log('Calling this')
      return value || fakeId()
    },
  },
  image: {
    type: Types.Logo,
    parse: function ({ url, ...rest }) {
      return {
        ...rest,
        fakeUrl: '',
        url: url && buildImageUrl(url),
        file: '',
      }
    },
    build: function ({file, ...rest}) {
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

