import React from 'react'
import { connect } from 'react-redux'
import UnAuthorized from './unauthorized'

export const UserState = {
  UNAUTHENTICATED: 'unauthenticated',
  ACCOUNT: 'account',
}


class Authorization extends React.Component {
  checkPrivileges() {
    const { privileges, account } = this.props
    if (Array.isArray(privileges)) {
      let allow = false
      for(const p in privileges) {
        const privilege = privileges[p]
        if (privilege === UserState.UNAUTHENTICATED) {
          allow = true
          break
        }
        else if (privilege === UserState.ACCOUNT) {
          if (account && account.session) {
            allow = true
            break
          }
        }
      }
      return allow
    }
    return privileges === UserState.ACCOUNT ? (account && account.session): true
  }

  render() {
    return this.checkPrivileges() ?  this.props.children : <UnAuthorized />
  }
}

const ConnectedAuthorization = connect(state => ({
  account: state.account
}), dispatch => ({
})) (Authorization)


const withAuthorization = (Component, privileges = [], options = {}) => {
  return (props) => {
    return (
      <ConnectedAuthorization privileges={privileges} options={options}>
        <Component {...props} />
      </ConnectedAuthorization>
    )
  }
}

export default withAuthorization
