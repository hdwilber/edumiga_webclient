import React from 'react'
import { Image, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Login from '../../components/account/login'
import * as AccountActions from '../../redux/account/actions'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }


  componentDidMount() {
    console.log(this.props.visible)
  }
  handleLogin(data) {
    const { name, login } = this.props
    login(data, { modal: { name } } )
  }

  render() {
    const { visible, onClose }  = this.props
    return (
      <Modal open={visible} size="tiny"
        onClose={onClose}
      >
        <Modal.Header>Enter your credentials</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Login onLogin={this.handleLogin} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect (state => ({ 
}), dispatch => ({
  login: (data, options) => dispatch (AccountActions.login(data, options)),
})) (LoginModal)
