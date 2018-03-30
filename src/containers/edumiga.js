import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import Navbar from '../components/navbar'
import * as accountActions from '../redux/account/actions'
import * as ModalActions from '../redux/modal/actions'
import '../sass/index.scss'

import { Grid } from 'semantic-ui-react'

import LoginModal from '../components/modals/login'

const LOGIN_MODAL_NAME = 'login-modal'

class Edumiga extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.checkAuthorization = this.checkAuthorization.bind(this)
    this.handleToggleLogin = this.handleToggleLogin.bind(this)
    this.handleLoginClose = this.handleLoginClose.bind(this)
  }

  componentDidMount() {
    const { sessionRestore } = this.props
    sessionRestore()
  }

  handleLogout() {
    const { logout } = this.props
    logout()
  }

  checkAuthorization() {
    const { account: { session }, location: { pathname, query } } =  this.props
    if (pathname.indexOf('institution/create') > -1) {
      if (!session) {
        return false 
      } else if (!query.owned) {
        return true 
      }
    } else if (pathname.indexOf('institution/list') > -1) {
      if (query.owned) {
        if (!session) {
          return false
        }
      }
    }
    return true
  }

  handleToggleLogin() {
    const { showModal } = this.props
    showModal(LOGIN_MODAL_NAME)
  }

  handleLoginClose() {
    hideModal(LOGIN_MODAL_NAME)
  }

  render() {
    const { account, modal } = this.props
    return (
      <div>
        <Navbar account={account}
          onClickLogin={this.handleToggleLogin}
          onLogout={this.handleLogout}
        />
        { this.checkAuthorization() ? (this.props.children): (<Redirect to="/"/>)}


        { modal && (
          <LoginModal 
            visible={ModalActions.checkIfVisible(modal.visibleModals, LOGIN_MODAL_NAME)}
            name={LOGIN_MODAL_NAME}
            onClose={this.handleLoginClose}
          />
        )}
      </div>
    )
  }
}

export default connect((state) => ({
  account: state.account,
  modal: state.modal,
}), (dispatch => ({
  sessionRestore: () => dispatch(accountActions.sessionRestore()),
  logout: () => dispatch(accountActions.logout()),
  login: (data) => dispatch(accountActions.login(data)),
  showModal: (name) => dispatch(ModalActions.show(name)),
  hideModal: (name) => dispatch(ModalActions.hide(name)),
  }))) (withRouter(Edumiga))
