export function buildImageUrl(url) {
  const { REACT_APP_API_SERVER_NAME, REACT_APP_API_BASEURL } = process.env
  return `${REACT_APP_API_SERVER_NAME || ''}${REACT_APP_API_BASEURL}${url}`
}

