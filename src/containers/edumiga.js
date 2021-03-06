import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import Navbar from '../components/navbar'
import * as accountActions from '../redux/account/actions'
import * as ModalActions from '../redux/modal/actions'
import '../sass/index.scss'
import ApiServicesContext, { apiServices } from '../services'
import TypesManagerContext, { typesManager } from './shared/types'
import LoginModal from '../containers/account/modals/login'

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

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps
    if (account.session) {
      apiServices.setSession(account.session)
    }
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
    } else if (pathname.indexOf('institutions') > -1) {
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
    const { hideModal } = this.props
    hideModal(LOGIN_MODAL_NAME)
  }

  render() {
    const { account, modal } = this.props
    return (
      <React.Fragment>
        <ApiServicesContext.Provider value={apiServices}>
          <TypesManagerContext.Provider value={typesManager}>
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
          </TypesManagerContext.Provider>
        </ApiServicesContext.Provider>
      </React.Fragment>
    )
  }
}

export default connect((state) => ({
  account: state.account,
  modal: state.modal,
}), (dispatch => {
  typesManager.setDispatch(dispatch)
  return {
    sessionRestore: () => dispatch(accountActions.sessionRestore()),
    logout: () => dispatch(accountActions.logout()),
    login: (data) => dispatch(accountActions.login(data)),
    showModal: (name) => dispatch(ModalActions.show(name)),
    hideModal: (name) => dispatch(ModalActions.hide(name)),
  }
})) (withRouter(Edumiga))
