import { Types, setDefault } from './defaults'

export function parseData(specs, data) {
  return Object.keys(specs).reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = data[name] || spec.default || setDefault(type)
    const result = spec.parse ? spec.parse(value): value
    acc[name] = result
    return acc
  }, {})
}

export function saveData(specs, data) {
  return Object.keys(specs).reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = data[name] || spec.default || setDefault(type)
    const result = spec.build ? spec.build(value): value

    if (spec.save) {
      spec.save(result)
    } else {
      acc[name] = result
    }

    return acc;
  }, {})
}

