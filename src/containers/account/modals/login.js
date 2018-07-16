import React from 'react'
import { Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Login from '../../../components/account/login'
import * as AccountActions from '../../../redux/account/actions'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleLogin(data) {
    const { name, login } = this.props
    login(data, { modal: { name } } )
  }

  handleRegister(data) {
    const { createAccount }  = this.props
    createAccount(data)
  }

  render() {
    const { account, visible, onClose }  = this.props
    return (
      <Modal open={visible} size="tiny"
        onClose={onClose}
      >
        <Modal.Header>Enter your credentials</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Login onLogin={this.handleLogin} 
              onRegister={this.handleRegister}
              error={account && account.error}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect (state => ({ 
  account: state.account
}), dispatch => ({
  login: (data, options) => dispatch (AccountActions.login(data, options)),
  createAccount: (data, options) => dispatch (AccountActions.create(data, options)),
})) (withRouter( LoginModal))
