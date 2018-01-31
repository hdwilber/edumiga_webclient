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
  draft: {
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
  }
}

export function format (template, from = null) {
  const ret = {}
  if(!from) {
    for(const name in template) {
      const field = template[name]
      if (field.type === Types.string) {
        ret[name] = field.default || ''
      } else {
        ret[name] = field.default
      }
    }
    return ret

  } else {
    for( const name in template ) {
      console.log('%o : %o ', name, from[name])
      const field = template[name]
      if (field.type === Types.string) {
        ret[name] = from[name] || ''
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

const Opportunity = {

}
