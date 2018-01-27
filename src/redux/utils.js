const { REACT_APP_API_BASEURL } = process.env

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
export function buildImageUrl(url) {
  const { REACT_APP_API_SERVER_NAME } = process.env
  return `${REACT_APP_API_SERVER_NAME || ''}${REACT_APP_API_BASEURL}${url}`
}

export function createActionLabels(name) {
  return {
    start: name,
    success: `${name}_SUCCESS`,
    failed: `${name}_FAILED`
  }
}
