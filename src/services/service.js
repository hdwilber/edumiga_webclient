const { REACT_APP_API_BASEURL } = process.env

class Service {
  constructor(base) {
    this.baseName = base
  }

  createHeaders(useAuth = true) {
    const headers = new Headers()
    headers.append('content-type', 'application/json')
    if (useAuth && this.session) {
      headers.append('Authorization', this.session.id)
    }
    return headers
  }

  createUploadHeaders(useAuth = true) {
    const headers = new Headers()
    if (useAuth && this.session) {
      headers.append('Authorization', this.session.id)
    }
    return headers
  }

  setSession(session) {
    this.session = session
  }

  getBaseUrl () {
    return `${REACT_APP_API_BASEURL}/${this.baseName}`
  } 

  createRequest(method, path, rbody, useAuth = true) {
    const url = (path !== '') ? `/${this.getBaseUrl()}/${path}` : `/${this.getBaseUrl()}`
    if (method === 'POST' || method === 'PATCH') {
      return fetch(url,
        {
          method: method,
          headers: this.createHeaders(),
          body: JSON.stringify(rbody),
        })
    } else {
      return fetch(url,
        {
          method: method,
          headers: this.createHeaders(),
        })
    }
  }
}

export default Service
