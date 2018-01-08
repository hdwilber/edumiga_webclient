import React from 'react'
import { Route } from 'react-router-dom'

import { Home } from './containers'
import { Edit as InstitutionEdit, List as InstitutionList } from './containers/institution'

function Routes(props) {
  const { Wrapper } = props
  return (
    <Wrapper>
      <Route exact path="/" component={ Home } />
      <Route exact path="/institutions" component={ InstitutionList } />
      <Route exact path="/institution/create" component={ InstitutionEdit } />
      <Route exact path="/institution/:institutionId/edit" component={ InstitutionEdit } />
    </Wrapper>
  )
}

export default Routes
