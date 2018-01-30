import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { Header, Form } from 'semantic-ui-react'
import * as accountActions from '../../redux/account/actions'

class Confirm extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { location, match, accountConfirm } = this.props
    const { uid, token } = location.query

    if(uid && token) {
      accountConfirm(uid, token)
    }
  }

  render() {
    const { account } = this.props
    if (account && account.confirmed) {
      return (<Header>Your account has been confirmed successfully.</Header>)
    } else {
      return (<Header>Checking confirmation code.</Header>)
    }
  }
}

export default connect((state) => ({
  account: state.account,
}), (dispatch) => ({
  accountConfirm: (uid, token) => dispatch(accountActions.confirm(uid, token)),
}))(withRouter(Confirm))
