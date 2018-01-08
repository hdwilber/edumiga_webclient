import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import Navbar from '../components/navbar'
import * as accountActions from '../redux/account/actions'

class Edumiga extends Component {
  constructor(props) {
    super(props)
    
    this.handleLogout = this.handleLogout.bind(this)
    this.checkAuthorization = this.checkAuthorization.bind(this)
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
    const { account, location } =  this.props
    if (location.pathname.indexOf('institution/create') > -1) {
      if (!account.session) {
        return false 
      }
    } 
    return true
  }

  render() {
    const { account } = this.props
    console.log(this.props)
    return (
      <div>
        <Navbar account={account}
          onLogout={this.handleLogout}
        />

        { this.checkAuthorization() && (this.props.children) }
      </div>)
  }
}

export default connect((state) => ({
  account: state.account,
}), (dispatch => ({
  sessionRestore: () => dispatch(accountActions.sessionRestore()),
  logout: () => dispatch(accountActions.logout()),
  }))) (withRouter(Edumiga))
