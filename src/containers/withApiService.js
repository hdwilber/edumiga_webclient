import React from 'react'
import ApiServiceContext from '../services'

function withApiService(Component) {
  return (props) => {
    return (
      <ApiServiceContext.Consumer>
        { ( service ) => <Component {...props} apiService={service} /> }
      </ApiServiceContext.Consumer>
    )
  }
}

export default withApiService
