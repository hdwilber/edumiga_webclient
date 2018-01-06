import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

class Edumiga extends Component {
  render() {
    return (<div>{this.props.children}</div>)
  }
}

export default Edumiga
