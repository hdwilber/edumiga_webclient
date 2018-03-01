import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import Navbar from '../components/navbar'
import * as accountActions from '../redux/account/actions'
import '../sass/index.scss'

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

  render() {
    const { account } = this.props
    return (
      <div>
        <Navbar account={account}
          onLogout={this.handleLogout}
        />
        { this.checkAuthorization() ? (this.props.children): (<Redirect to="/"/>)}
      </div>)
  }
}

export default connect((state) => ({
  account: state.account,
}), (dispatch => ({
  sessionRestore: () => dispatch(accountActions.sessionRestore()),
  logout: () => dispatch(accountActions.logout()),
  }))) (withRouter(Edumiga))
