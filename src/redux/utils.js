const { REACT_APP_API_BASEURL } = process.env

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
      type: `${action}_FULFILLED`,
      payload: payload,
    })

    if (postThen) postThen(payload)
  })
  .catch(error => {
    dispatch({
      type: `${action}_REJECTED`,
      payload: error,
    })

    if (postCatch) postCatch(error)

  })
  return dispatch({
    type: action,
  })
}

// Needs to be refactorized
export function buildImageUrl(url) {
  return `/${REACT_APP_API_BASEURL}${url}`
}
