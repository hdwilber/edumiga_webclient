import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import { FinalForm, FinalField } from '../utils/forms'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister(values) {
    const { onRegister } = this.props
    onRegister({
      ...values
    })
  }

  handleSubmit(values) {
    const { onLogin } = this.props
    onLogin(values)
  }

  render() {
    const { error, loading, extraActions } = this.props

    return (
      <FinalForm 
        onSubmit={this.handleSubmit}
        submitLabel="Login"
        loading={false}
        error={error}
        errorMessage="Bad credentials"
        extraButtons={
          (values) => {
            return (
              <Button 
                onClick={(e) => {
                  e.preventDefault()
                  this.handleRegister(values)
                }}
              >
                Register
              </Button>
            )
          }
        }
      >
        <FinalField 
          label="Email" 
          name="email" type="email" 
          placeHolder="Email"
          validations={[]}
        />
        <FinalField 
          label="Password" 
          name="password" 
          type="password" 
          placeHolder="Password"
        />
      </FinalForm>
    )
  }
}

export default withRouter(Login)
