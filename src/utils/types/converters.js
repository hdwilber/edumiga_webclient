import { setDefault } from './defaults'

export function parseData(specs, data = {}) {
  return Object.keys(specs).reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = (data && data[name]) || spec.default || setDefault(type)
    const result = spec.parse ? spec.parse(value): value
    acc[name] = result
    return acc
  }, {})
}

export function buildData(specs, data = {}, options) {
  return Object.keys(specs).reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = (data && data[name]) || spec.default || setDefault(type)
    const result = spec.build ? spec.build(value, data, options): value

    acc[name] = result

    return acc;
  }, {})
}

export function saveData(specs, data = {}, options) {
  const onHold = []
  const instance = Object.keys(specs).reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = (data && data[name]) || spec.default || setDefault(type)
    const result = spec.build ? spec.build(value, data, options): value

    const save = spec.save
    if (save) {
      onHold.push({spec, name, value })
    } else {
      acc[name] = result
    }
    return acc
  }, {})

  return {
    savable: instance,
    onHold,
  }
}
