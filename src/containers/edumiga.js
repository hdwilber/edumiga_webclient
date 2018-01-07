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
  }

  handleLogout() {
    const { logout } = this.props
    logout()
  }

  render() {
    const { account } = this.props

    return (<div>
      <Navbar account={account}
        onLogout={this.handleLogout}
      />
      {this.props.children}
      </div>)
  }
}

export default connect((state) => ({
  account: state.account,
}), {...accountActions}) (Edumiga)
