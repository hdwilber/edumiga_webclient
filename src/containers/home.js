import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import Login from '../components/account/login'
import InstitutionCreate from '../components/institution/create'

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

  function handleInstitutionCreate(data) {
    const { institutionCreate } = props
    institutionCreate(data)
  }

  function handleInstitutionCancel(data) {
    console.log('asdf')
  }

  const { account } = props

  return (
    <div>
      <Login loading={account.loading} 
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <InstitutionCreate onCreate={handleInstitutionCreate}
        onCancel={handleInstitutionCancel}
      />
    </div>

  )
}

export default connect((state) => ({
  account: state.account
}), (dispatch) => ({
  accountCreate: (data) => dispatch(accountActions.create(data)),
  accountLogin: (data) => dispatch(accountActions.login(data)),
  institutionCreate: (data) => dispatch(institutionActions.create(data)),
})) (Home)
