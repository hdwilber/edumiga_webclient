import React from 'react'
import TypesManagerContext from './types'
import { connect } from 'react-redux'

function withTypesManager(Component) {
  return (props) => {
    return (
      <TypesManagerContext.Consumer>
        { ( typesManager ) => <Component {...props} typesManager={typesManager} /> }
      </TypesManagerContext.Consumer>
    )
  }
}

export default withTypesManager
