import { buildImageUrl } from './redux/utils'

export const Types = {
  boolean: 1,
  number: 2,
  string: 3,
  object: 4,
  array: {
    number: 10,
    string: 11,
    object: 12
  },
}

export const Institution = {
  id: {
    type: Types.string,
    default: null,
  },
  prename: {
    type: Types.string,
  },
  name: {
    type: Types.string,
  },
  description: {
    type: Types.string,
  },
  published: {
    type: Types.boolean,
    default: false,
  },
  type: {
    type: Types.string,
  },
  address: {
    type: Types.string,
  },
  country: {
    type: Types.string,
  },
  state: {
    type: Types.string,
  },
  county: {
    type: Types.string,
  },
  phone: {
    type: Types.string,
  },
  levels: {
    type: Types.array.string,
    default: [],
  },
  adminLevel: {
    type: Types.string,
  },
  location: {
    type: Types.object,
    default: {
      point: null,
      zoom: 10,
    }
  },
  logo: {
    notSendable: true,
    type: Types.object,
    format: function (data) {
      return {
        file: null,
        url: data ? (buildImageUrl(data.url)): '',
        fakeUrl: '',
      }
    },
    default: {
      file: null,
      url: '',
      fakeUrl: '',
    }
  },
  head: {
    notSendable: true,
    type: Types.object,
    default: null
  },
  dependencies: {
    notSendable: true,
    type: Types.array.object,
    default: [],
  },
  categories: {
    notSendable: true,
    type: Types.array.object,
    default: []
  }
}

export function format (template, from = null) {
  const ret = {}
  if(!from) {
    for(const name in template) {
      const field = template[name]
      if (field.type === Types.string) {
        ret[name] = field.default || ''
      } else if (field.type === Types.number) {
        ret[name] = field.default ? `${field.default}`: ' -- '
      }
      else {
        ret[name] = field.default
        if (name === 'dependencies') {
          //console.log(field)
        }
      }
    }
    return ret

  } else {
    for( const name in template ) {
      //console.log('%o : %o ', name, from[name])
      const field = template[name]
      if (field.type === Types.string) {
        ret[name] = from[name] || ''
      } else if (field.type === Types.number) {
        ret[name] = from[name] ? `${from[name]}`: ''
      } else {
        const odata = from[name]
        if (odata) {
          if (field.format) {
            ret[name] = field.format(odata)
          } else {
            ret[name] = odata
          }
        } else {
          if (field.default) {
            ret[name] = field.default
          } else {
            ret[name] = null
          }
        }
      }
    }
    return ret
  }
}

export function formatOutput(template, from) {
  const ret = {}

  for (const name in template) {
    const field = template[name] 
    if (!field.notSendable) {
      ret[name] = from[name]
    }
  }

  return ret
}

export const Opportunity = {
  id: {
    type: Types.string,
    default: null,
  },
  name: {
    type: Types.string,
  },
  duration: {
    type: Types.number,
  },
  description: {
    type: Types.string,
  },
  regime: {
    type: Types.string,
  },
  published: {
    type: Types.boolean,
    default: true,
  },
  type: {
    type: Types.string,
  },
  degrees: {
    type: Types.array.string,
    default: []
  },
  logo: {
    notSendable: true,
    type: Types.object,
    format: function (data) {
      return {
        file: null,
        url: data ? (buildImageUrl(data.url)): '',
        fakeUrl: '',
      }
    },
    default: {
      file: null,
      url: '',
      fakeUrl: '',
    }
  },
}


export const Course = {
  id: {
    type: Types.string,
    default: null,
  },
  name: {
    type: Types.string
  },
  code: {
    type: Types.string
  },
  level: {
    type: Types.number,
    default: 1,
  },
  description: {
    type: Types.string
  },
  duration: {
    type: Types.number,
    default: 0,
  },
  published: {
    type: Types.boolean,
    default: false,
  },
  optional: {
    type: Types.boolean,
    default: false
  },
  type: {
    type: Types.string,
  },
  prerequisites: {
    notSendable: true,
    type: Types.array.object,
    default: [],
    format: function(data = [], options = {}) {
      return data.map((c,idx) => c.id) 
    }
  }
}

export const AccountIdentity = {
  id: {
    type: Types.string,
    default: null,
  },
  displayName: {
    type: Types.string,
  },
  title: {
    type: Types.string
  },
  firstName: {
    type: Types.string,
  }, 
  lastName: {
    type: Types.string,
  },
  birthDate: {
    notSendable: true,
    type: Types.string,
  }, 
  occupation: {
    type: Types.string,
  }, 
  country: {
    type: Types.string,
  }, 
  state: {
    type: Types.string,
  },
  county: {
    type: Types.string,
  },
  address: {
    type: Types.string,
  },
  phone: {
    type: Types.string,
  },
  interests: {
    type: Types.array.string,
    default: [],
  },
  location: {
    type: Types.object,
    default: {
      point: null,
      zoom: 10,
    }
  },
  photo: {
    notSendable: true,
    type: Types.object,
    format: function (data) {
      return {
        file: null,
        url: data ? (buildImageUrl(data.url)): '',
        fakeUrl: '',
      }
    },
    default: {
      file: null,
      url: '',
      fakeUrl: '',
    }
  },
}
