import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import Login from '../components/account/login'

import * as accountActions from '../redux/account/actions'

const Home = (props) => {

  function handleLogin(data) {
    console.log(data)
    const { login } = props
    login(data)
  }

  function handleRegister(data) {
    console.log(data)
    const { create } = props
    create(data)
  }

  const { account } = props

  return (
    <div>
      <Login loading={account.loading} 
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  )
}

export default connect((state) => ({
  account: state.account
}), {...accountActions})(Home)
