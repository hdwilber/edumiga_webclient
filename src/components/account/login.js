import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRegister = this.handleRegister.bind(this)

    this.state = {
      email: '',
      password: '',
    }
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleClick() {
    const { onLogin } = this.props
    onLogin({
      email: this.state.email,
      password: this.state.password,
    })
  }
  
  handleRegister() {
    const { onRegister } = this.props
    onRegister({
      email: this.state.email,
      password: this.state.password,
    })
  }

  render() {
    const { onLogin, loading } = this.props

    return (
      <Form>
        <Form.Input name="email" onChange={this.handleInputChange} label="Email" type="email"/>
        <Form.Input name="password" onChange={this.handleInputChange} label="Password" type="password"/>

        <Button loading={loading} disabled={loading} 
          default
          onClick={this.handleClick}
        >Login</Button>

        <Button default
          onClick={this.handleRegister}
        >
          Register
        </Button>
      </Form>
    )
  }
}

export default Login
