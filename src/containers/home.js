import React from 'react'
import { connect } from 'react-redux'
import Login from '../components/account/login'
import { Grid, Header } from 'semantic-ui-react'

import * as accountActions from '../redux/account/actions'
import * as institutionActions from '../redux/institution/actions'

const Home = (props) => {

  function handleLogin(data) {
    console.log(data)
    const { accountLogin } = props
    accountLogin(data)
  }

  function handleRegister(data) {
    console.log(data)
    const { accountCreate } = props
    accountCreate(data)
  }

  const { account } = props

  return (
    <Grid container centered>
      <Grid.Column width={10}>
        <Header size="huge" content="Login"/>
      </Grid.Column>
      <Grid.Column width={10}>
        {(account && !account.session) && (
        <Login loading={account.loading} 
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
        )}
      </Grid.Column>
    </Grid>

  )
}

export default connect((state) => ({
  account: state.account
}), (dispatch) => ({
  accountCreate: (data) => dispatch(accountActions.create(data)),
  accountLogin: (data) => dispatch(accountActions.login(data)),
  institutionCreate: (data) => dispatch(institutionActions.create(data)),
})) (Home)
