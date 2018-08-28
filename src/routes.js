import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import { Home } from './containers'
import { List as InstitutionList } from './containers/institution'
import InstitutionView from './containers/institution/view'
import OpportunityView from './containers/opportunity/view'
import { IdentityEditor } from './containers/account'
import AccountConfirm from './containers/account/confirm'
import { Editor as InstitutionEditor } from './containers/institution'
import { Editor as OpportunityEditor } from './containers/opportunity'

import { history } from './redux/configureStore'

function Routes(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/opportunity" component={ OpportunityEditor } />
        <Route exact path="/opportunity/:opportunityId/editor" component={ OpportunityEditor } />
        <Route exact path="/opportunity/:opportunityId" component={ OpportunityView } />
        <Route exact path="/institution" component={ InstitutionEditor } />
        <Route exact path="/institution/:institutionId/editor" component={ InstitutionEditor } />
        <Route exact path="/institution/:institutionId" component={ InstitutionView } />

        <Route exact path="/account/identity" component={ IdentityEditor } />
        <Route exact path="/account/confirm" component={ AccountConfirm } />
        <Route exact path="/institutions" component={ InstitutionList } />
      </Switch>
    </Router>
  )
}

export default Routes
