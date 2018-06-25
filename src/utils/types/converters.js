import { setDefault } from './defaults'

export function parseData(specs, data = {}) {
  //console.log(specs)
  //console.log(data)
  return Object.keys(specs).reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = (data && data[name]) || spec.default || setDefault(type)

    const isArray = type instanceof Array

    let result
    if (isArray) {
      const { spec: subSpec } = spec
      result = subSpec
        //value.map(val => (spec.parse ? spec.parse(val): val))
        ? value.map(val => parseData(subSpec, val))
        : value.map(val => (spec.parse ? spec.parse(val): val))
    } else {
      const { spec: subSpec } = spec
        //console.log(spec)
        //console.log(value)
      result = subSpec
        ? parseData(subSpec, value)
        : spec.parse ? spec.parse(value): value
    }
    //console.log(result)
    acc[name] = result
    return acc
  }, {})
}

export function buildData(specs, data = {}, options = {}) {
  return Object.keys(specs).reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = (data && data[name]) || spec.default || setDefault(type)
    const isArray = type instanceof Array

    let result 
    if (isArray) {
      result = value.reduce((subAcc, val) => {
        const built = spec.build ? spec.build(val, data, options): val
        built && subAcc.push(built)
        return subAcc
      }, [])
      console.log(result)
    } else {
      result = spec.build ? spec.build(value, data, options): value
    }

    acc[name] = result

    return acc;
  }, {})
}

export function saveData(specs, data = {}, options) {
  const onHold = []
  const toRequest = []
  const instance = Object.keys(specs).reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = (data && data[name]) || spec.default || setDefault(type)
    //const result = spec.build ? spec.build(value, data, options): value

    const save = spec.save

    let result 
    const isArray = type instanceof Array
    if (save) {
      if (typeof save === 'object') {
        acc[save.field || name] = save.value(value, result)
      } else if (typeof save === 'function') {
        if (isArray) {
          result = value.map(val => (save(val, data, options) : val ))
        } else {
          result = save(value, data, options)
        }
        toRequest.push ({
          field: name, 
          results: result,
        })
      } else {
        acc[name] = value
      }
    } else {
      acc[name] = value
    }
    return acc
  }, {})

  return {
    savable: instance,
    onHold,
    toRequest,
  }
}

