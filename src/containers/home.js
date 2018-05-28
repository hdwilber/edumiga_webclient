import React from 'react'
import { connect } from 'react-redux'
import { Icon, Grid, Header } from 'semantic-ui-react'

import Finder from '../components/finder'

import * as accountActions from '../redux/account/actions'
import * as institutionActions from '../redux/institution/actions'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleFinder = this.handleFinder.bind(this)
  }

  handleLogin(data) {
    console.log(data)
    const { accountLogin } = this.props
    accountLogin(data)
  }

  handleRegister(data) {
    console.log(data)
    const { accountCreate } = this.props
    accountCreate(data)
  }

  handleFinder(e, {url}) {
    this.props.history.push(url)
  }

  render() {
    return (
      <Grid container centered>
        <Grid.Column width={16}>
          <Header className="main-title" content="Start to Grow!"/>
          <Header.Subheader className="secondary-title" content="Find Your School!"/>
          
          <div className="student-icon" >
            <Icon name="student" style={{width: '100%', height: '100%'}}/>
          </div>

          <div className="finder">
            <Finder onSearch={this.handleFinder} />
          </div>
        </Grid.Column>
      </Grid>

    )
  }
}

export default connect((state) => ({
  account: state.account
}), (dispatch) => ({
  accountCreate: (data) => dispatch(accountActions.create(data)),
  accountLogin: (data) => dispatch(accountActions.login(data)),
  institutionCreate: (data) => dispatch(institutionActions.create(data)),
})) (Home)
