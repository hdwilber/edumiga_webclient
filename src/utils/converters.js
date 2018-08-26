import _ from 'lodash'

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
        return typeof fieldType.default === 'function' ? fieldType.default() : fieldType.default
      }
      return _getValue(names, fieldType, val)
    })
    return arrayFormatted
  }

  if (fieldType._format) {
    if (value) {
      return fieldType._format(value)
    }
    return typeof fieldType.default === 'function' ? fieldType.default() : fieldType.default
  } 

  return _getValue(names, fieldType, value)
}


export function save(type, name, value, old, options) {
  const isArrayType = Array.isArray(type)
  const fieldType = isArrayType ? type[0]: type

  const { _save } = fieldType
  if (_save ) {
    const { name: newName, create, beforeAll, } = _save

    if (isArrayType) {
      return {
        name: newName || name,
        beforeAll: beforeAll ? beforeAll(value, old): null,
        value,
        old,
        data: null,
        children: value.map((val, index) => {
          const oldVal = old && old[index]
          return save(fieldType, `${name}:${index}`, val, oldVal, options)
        })
      }
    } else {
      const children = []

      const names = Object.keys(fieldType).filter(name => (name.indexOf('_') && name.indexOf('default')))
      const data = names.reduce((acc, name) => {

        const subValue = value[name]
        const subOldValue = old && old[name]
        const subType = fieldType[name]
        const isArray = Array.isArray(subType)
        const subFieldType = isArray ? subType[0]: subType

        const { _save: _subSave } = subFieldType

        if (_subSave) {
          const { name: newName, format, create, check } = _subSave
          if (create) {
            children.push(save(subType, name, subValue, subOldValue, options))
          } else {
            const subFormatted = format ? format(subValue, subOldValue) : subValue
            if (check) {
              if (check(subValue, subOldValue))
                acc[newName || name] = subFormatted
            } else {
              acc[newName || name] = subFormatted
            }
          }
        } else {
          const isEqual = _.isEqual(subValue, subOldValue)
          if (!isEqual)
            acc[name] = subValue
        }
        return acc
      }, {})

      if (value['id']) {
        data.id = value['id']
      }

      return {
        name,
        values: { 
          old,
          value,
          data,
        },
        children,
        save: create ? create(value, old, data) : null
      }
    }
  }
}

export async function runSave(node, parent, services, options, dispatch) {

  const { beforeAll, values, children, save } = node
  const newParent = { 
    parent,
    values,
  }
  const beforeAllInfo = beforeAll ? beforeAll(services, options, newParent, values): null

  if (beforeAllInfo) {
    const { action, request, options: infoOptions } = beforeAllInfo

    dispatch({
      type: action.start,
      payload: {
        options: infoOptions,
      }
    })

    const beforeAllResponse = await request
    if (beforeAllResponse.ok) {
      const { format, postThen } = beforeAllInfo
      let result

      try {
        const temp = await beforeAllResponse.json()
        result = format ? format(temp): temp
        newParent.beforeAll = result
      } catch(e) {
        console.log('Error here 1')
      }

      dispatch({
        type: action.success,
        payload: {
          result: newParent.beforeAll || {},
          options: infoOptions,
        }
      })
      if (postThen) postThen(dispatch, result, infoOptions)
    } else {
      const { postCatch, } = beforeAllInfo
      const error = await beforeAllResponse.text()
      dispatch({
        type: action.failed,
        payload: {
          error,
          options: infoOptions,
        }
      })
      if (postCatch) postCatch(dispatch, error, infoOptions)
    }
  }

  const saveInfo = save ? save(services, options, newParent, values) : null
  if (saveInfo) {
    const { action, request, options: infoOptions } = saveInfo

    dispatch({
      type: action.start,
      payload: {
        options: infoOptions,
      }
    })

    const saveResponse = await request
    if (saveResponse.ok) {
      const { format, postThen } = saveInfo
      let result
      try {
        const temp = await saveResponse.json()
        result = format ? format(temp): temp
        newParent.save = result
      } catch(e) {
        console.log('Error here 2')
      }

      dispatch({
        type: action.success,
        payload: {
          result: newParent.save || {},
          options: infoOptions,
        }
      })

      if (postThen) postThen(dispatch, result, infoOptions)
    } else {
      const { postCatch, } = saveInfo
      const error = await save.text()
      dispatch({
        type: action.success,
        payload: {
          error,
          options: infoOptions,
        }
      })

      if(postCatch) postCatch(dispatch, error, infoOptions)
    }
  }

  newParent.children = await Promise.all(children.map(child => {
    return  runSave(child, newParent, services, options, dispatch)
  }))

  return newParent
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
    } else {
      result = spec.build ? spec.build(value, data, options): value
    }

    acc[name] = result

    return acc;
  }, {})
}

