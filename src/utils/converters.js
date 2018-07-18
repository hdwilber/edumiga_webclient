function _getValue(names, type, value) {
  if (names.length > 0) {
    const formatted = names.reduce( (acc, name) => {
      const subValue = value ? value[name]: null
      acc[name] = format(type[name], subValue)
      return acc
    }, {})
    return formatted
  }
  return value || type.default 
}

export function format(type, value){
  const isArrayType = type instanceof Array
  const fieldType = isArrayType ? type[0]: type

  const names = Object.keys(fieldType).filter(name => (name.indexOf('_') && name.indexOf('default')))
  
  if (isArrayType) {
    if (!Array.isArray(value)) {
      return []
    }
    const arrayFormatted = value.map(val => {

      if (fieldType._format) {
        if (val) {
          return fieldType._format(val)
        }
        return fieldType.default
      }
      return _getValue(names, fieldType, val)
    })
    return arrayFormatted
  }

  if (fieldType._format) {
    if (value) {
      return fieldType._format(value)
    }
    return fieldType.default
  }
  return _getValue(names, fieldType, value)
}

export function save(type, value, oldValue, services, name, options = {}) {
  const isArrayType = type instanceof Array
  const fieldType = isArrayType ? type[0]: type

  const names = Object.keys(fieldType).filter(name => (name.indexOf('_') && name.indexOf('default')))

  const children = []

  const data = names.reduce((acc, name) => {
    const subType = fieldType[name]
    const subFieldType = isArrayType ? subType[0]: subType

    if(subFieldType._save) {
      const { _save } = subFieldType
      if (typeof _save === 'function') {
        children.push(save(subFieldType, value[name], oldValue && oldValue[name], services, name, options))
      }
      else if(typeof _save === 'object') {
        const { name: newName, format } = _save
        acc[newName] = format(value[name])
      }
    } else {
      acc[name] = value[name]
    }

    return acc
  }, {})

  const { _save } = fieldType
  const saveObj = typeof _save === 'function' && _save(services, data)

  return {
    name,
    save: saveObj,
    children,
  }
}

export function runSave(tree, parent, options) {
  return new Promise((resolve, reject) => {
    const { name, save, children } = tree
    console.log('Saving: %o', name)

    if (save) {
      const { action, request } = save(parent, options)
      request.then(response => {
        return response.json()
      })
      .then(part => {
        console.log(part)
        console.log('Why I can')
        resolve({
          result: part,
          children: children.map(child => runSave(child, part, options))
        })
      })
    } else {
      resolve(null)
    }
  })
}



export function buildData(specs, data = {}, options = {}) {
  const names = Object.keys(specs).filter(name => name.indexOf('_'))
  return names.reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = (data && data[name]) || spec.default || null
    const isArray = type instanceof Array

    let result 
    if (isArray) {
      result = value.reduce((subAcc, val) => {
        const built = spec.build ? spec.build(val, data, options): val
        built && subAcc.push(built)
        return subAcc
      }, [])
      //console.log(result)
    } else {
      result = spec.build ? spec.build(value, data, options): value
    }

    acc[name] = result

    return acc;
  }, {})
}

export function removeNotValid(specs, data = {}, options = {}) {
  const names = Object.keys(specs).filter(name => name.indexOf('_'))
  return names.reduce( (acc, name) => {
    acc[name] = data[names]
    return acc;
  }, {})
}

export function saveData(specs, data, options) {
  const children = []
  let isNew = false
  const names = Object.keys(specs).filter(name => name.indexOf('_'))

  const instance = names.reduce( (acc, name) => {
    const spec = specs[name]
    const type = spec.type || spec
    const value = (data && data[name]) || spec.default || null

    const isArray = type instanceof Array
    const save = spec.save

    if (name === 'id' && value.indexOf('fake') === 0) {
      isNew = true
    } else {
      if (spec.spec) {
        children.push({
          name: name,
          value: isArray ? value.map(val => saveData(spec.spec, val, options)) : saveData(spec.spec, value, options),
        })
      }
      else if (save) {
        if (isArray) {
          if (typeof save === 'object') {
            acc[save.field || name] = save.value(value)
          } else if (typeof save === 'function') {
            const newValue = value.map (val => save(val, data, options))
            if (newValue.length) {
              children.push ({
                name: name,
                value: newValue,
              })
            }
          } else {
            acc[name] = value
          }
        }
        else {
          if (typeof save === 'object') {
            acc[save.field || name] = save.value(value)
          } else if (typeof save === 'function') {
            const newValue = save(value, data, options)
            if (newValue) {
              children.push({
                name: name,
                value: newValue,
              })
            }
          } else {
            acc[name] = value
          }
        }
      } else {
        acc[name] = value
      }
    }
    return acc
  }, {})

  const main = specs._save(isNew, instance)

  return {
    children,
    instance: main,
  }
}


export function doRequests(specs, info, data) {
  return (dispatch, getState) => {
    const { instance, children } = info
    //console.log(info)
    if (instance) {
      const { name, request } = instance(data)

      request.then(response => {
        if (response.ok) {
          //console.log('ok')
          return response.json()
        }
      })
      .then(data => {
        dispatch({
          type: 'TEST_' +name.success,
          payload: {
            result: data,
          }
        })
        
        if (specs) {
          children.forEach(child => {
            const { name, value } = child
            const spec = specs[name]
            const type = spec.type || spec
            const isArray = type instanceof Array

            if (isArray) {
              value.forEach(val => {
                dispatch(doRequests(spec.spec, val, data))
              })
            } else {
              dispatch(doRequests(spec.spec, value, data))
            }
          })
        }
      })
      .catch(error => {
        console.log('error')
        console.log(error)
      })

      return {
        type: 'RUN_REQUESTS'
      }
    } else {
      dispatch(doRequests(null, {
        instance: info,
        children: [],
      }, data))
    }
    return {
      type: 'RUN_REQUESTS_ENDED',
    }
  }
}
