import { buildImageUrl } from './../../redux/utils'

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
  image: {
    type: Types.object,
    parse: parseImage,
    build: function (data) {},
    save: function (data) {},
    default: {
      file: null,
      url: '',
      fakeUrl: '',
    }
  }
}

