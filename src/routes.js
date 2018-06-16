import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import { Home } from './containers'
import { Edit as InstitutionEdit, List as InstitutionList } from './containers/institution'
import InstitutionView from './containers/institution/view'
import OpportunityEdit from './containers/opportunity/edit'
import AccountIdentity from './containers/account/identity'
import AccountConfirm from './containers/account/confirm'
import InstitutionEditor from './containers/institution/editor'

import { history } from './redux/configureStore'

function Routes(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/account/identity" component={ AccountIdentity } />
        <Route exact path="/account/confirm" component={ AccountConfirm } />
        <Route exact path="/institutions" component={ InstitutionList } />
        <Route exact path="/institution/create" component={ InstitutionEdit } />
        <Route exact path="/institution" component={ InstitutionEditor } />
        <Route exact path="/institution/:institutionId" component={ InstitutionView } />
        <Route exact path="/institution/:institutionId/edit" component={ InstitutionEdit } />
        <Route exact path="/institution/:institutionId/editor" component={ InstitutionEditor } />
        <Route exact path="/institution/:institutionId/opportunity/:opportunityId" component={ OpportunityEdit } />
      </Switch>
    </Router>
  )
}

export default Routes
