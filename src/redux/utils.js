export function withService(action, service) {
  return (...args) => {
    return function(dispatch, getState) {
      const { session } = getState().account
      if( args.service ) {
        args.service.setSession(session)
      }
      const actionInfo = action(service, ...args)
      return processAction(dispatch, actionInfo)
    }
  }
}

export function processAction (dispatch, info) {
  if (!info) {
    console.log('Nothing to do')
    return null
  }
  const { name, request, format, postThen, postCatch, options } = info

  request.then(response => {
    if (response.ok) {
      return response.json ? response.json(): Promise.resolve({})
    }
    return Promise.reject({error: 'Not everything was ok'})
  })
  .then(data => {
    const result = format ? format(data): data
    dispatch({
      type: name.success,
      payload: {
        result,
        options,
      }
    })
    if (postThen) postThen(dispatch, result, options)
  })
  .catch(error => {
    console.log(error)
    dispatch({
      type: name.failed,
      payload: {
        error,
        options,
      }
    })

    if (postCatch) postCatch(dispatch, error, options)
  })

  return dispatch({
    type: name.start,
    payload: {
      options,
    }
  })
}

export function createActionTypesObject(base) {
  return {
    start: base,
    success: `${base}_SUCCESS`,
    failed: `${base}_FAILED`,
  }
}

export function dispatchRequestActions(dispatch, action, request, functions = {}, options = {}) {
  request.then(response => {
    if (response.ok) {
      return response.json ? response.json(): Promise.resolve({})
    }
    return Promise.reject(new Error('Request failed'))
  })
  .then(data => {
    const result = functions.format ? functions.format(data): data

    dispatch({
      type: action.success,
      payload: {
        result,
        options,
      }
    })

    if (functions.postThen) functions.postThen(result, options)
  })
  .catch(error => {
    dispatch({
      type: action.failed,
      payload: {
        error,
        options,
      }
    })

    if (functions.postCatch) functions.postCatch(error, options)
  })
  return dispatch({
    type: action.start,
    payload: {
      options,
    }
  })
}

export function handleRequestEmpty(dispatch, getState, action, request, data, postThen = null, postCatch = null) {
  request.then (response => {
    if (response.ok) {
      dispatch({
        type: action.success,
        payload: data,
      })

      if (postThen) postThen(data)
    }
    else {
      return Promise.reject(new Error('Request failed'))
    }
  })
  .catch(error => {
    dispatch({
      type: action.failed,
      payload: error,
    })

    if (postCatch) postCatch(error)

  })
  return dispatch({
    type: action.start,
  })
}

export function handleRequestEmptyO(dispatch, action, request, fncs  = {}, options = {}) {
  request.then (response => {
    if (response.ok) {
      dispatch({
        type: action.success,
        payload: options,

      })
    }
    else {
      return Promise.reject(new Error('Request failed'))
    }
  })
  .then(data => {
    const payload = fncs.format ? fncs.format(data): data
    dispatch({
      type: action.success,
      payload: {
        ...payload,
        ...options,
      }
    })

    if (fncs.postThen) fncs.postThen(payload, options)
  })
  .catch(error => {
    console.log(error)
    dispatch({
      type: action.failed,
      payload: {
        error,
        ...options,
      }
    })

    if (fncs.postCatch) fncs.postCatch(error, options)

  })
  return dispatch({
    type: action.start,
    payload: {
      ...options,
    }
  })
}
export function handleRequestO(dispatch, action, request, fncs  = {}, options = {}) {
  request.then (response => {
    if (response.ok) return response.json()
    else {
      return Promise.reject(new Error('Request failed'))
    }
  })
  .then(data => {
    const payload = fncs.format ? fncs.format(data): data
    dispatch({
      type: action.success,
      payload: {
        ...payload,
        ...options,
      }
    })

    if (fncs.postThen) fncs.postThen(payload, options)
  })
  .catch(error => {
    console.log(error)
    dispatch({
      type: action.failed,
      payload: {
        error,
        ...options,
      }
    })

    if (fncs.postCatch) fncs.postCatch(error, options)

  })
  return dispatch({
    type: action.start,
    payload: {
      ...options,
    }
  })
}

export function handleRequest(dispatch, getState, action, request, formatter  = null, postThen = null, postCatch = null) {
  request.then (response => {
    if (response.ok) return response.json()
    else {
      return Promise.reject(new Error('Request failed'))
    }
  })
  .then(data => {
    const payload = formatter ? formatter(data): data
    dispatch({
      type: action.success,
      payload: payload,
    })

    if (postThen) postThen(payload)
  })
  .catch(error => {
    console.log(error)
    dispatch({
      type: action.failed,
      payload: error,
    })

    if (postCatch) postCatch(error)

  })
  return dispatch({
    type: action.start,
  })
}

// Needs to be refactorized
export function createActionLabels(name) {
  return {
    start: name,
    success: `${name}_SUCCESS`,
    failed: `${name}_FAILED`
  }
}

