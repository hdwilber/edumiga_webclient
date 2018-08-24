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
export async function runSave(node, parent, services, options) {

  const { beforeAll, values, children, save } = node
  const newParent = { 
    parent,
    values,
  }
  const beforeAllInfo = beforeAll ? beforeAll(services, options, newParent, values): null

  if (beforeAllInfo) {
    const { request } = beforeAllInfo
    const beforeAllResponse = await request
    if (beforeAllResponse.ok) {
      try {
        newParent.beforeAll = await beforeAllResponse.json()
      } catch(e) {
        console.log('Error here 1')
      }
    }
  }

  const saveInfo = save ? save(services, options, newParent, values) : null
  if (saveInfo) {
    const { request } = saveInfo
    const saveResponse = await request
    if (saveResponse.ok) {
      try {
        newParent.save = await saveResponse.json()
      } catch(e) {
        console.log('Error here 2')
      }
    }
  }

  newParent.children = await Promise.all(children.map(child => {
    return  runSave(child, newParent, services, options)
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
      //console.log(result)
    } else {
      result = spec.build ? spec.build(value, data, options): value
    }

    acc[name] = result

    return acc;
  }, {})
}

/*
 *export function doRequests(specs, info, data) {
 *  return (dispatch, getState) => {
 *    const { instance, children } = info
 *    //console.log(info)
 *    if (instance) {
 *      const { name, request } = instance(data)
 *
 *      request.then(response => {
 *        if (response.ok) {
 *          //console.log('ok')
 *          return response.json()
 *        }
 *      })
 *      .then(data => {
 *        dispatch({
 *          type: 'TEST_' +name.success,
 *          payload: {
 *            result: data,
 *          }
 *        })
 *        
 *        if (specs) {
 *          children.forEach(child => {
 *            const { name, value } = child
 *            const spec = specs[name]
 *            const type = spec.type || spec
 *            const isArray = type instanceof Array
 *
 *            if (isArray) {
 *              value.forEach(val => {
 *                dispatch(doRequests(spec.spec, val, data))
 *              })
 *            } else {
 *              dispatch(doRequests(spec.spec, value, data))
 *            }
 *          })
 *        }
 *      })
 *      .catch(error => {
 *        console.log('error')
 *        console.log(error)
 *      })
 *
 *      return {
 *        type: 'RUN_REQUESTS'
 *      }
 *    } else {
 *      dispatch(doRequests(null, {
 *        instance: info,
 *        children: [],
 *      }, data))
 *    }
 *    return {
 *      type: 'RUN_REQUESTS_ENDED',
 *    }
 *  }
 *}
 */
