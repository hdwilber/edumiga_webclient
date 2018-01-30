import React from 'react'
import { Form,  } from 'semantic-ui-react'

const FormRecovery = (props) => {
  const { onInputChange } = props
  return ({
    <Form>
      <Form.Field>
        <label>New password</label>
        <Form.Input name="password" value={data.password} onChange={onInputChange} />
      </Form.Field>
      <Form.Field>
        <label>Retype new password</label>
        <Form.Input name="password2" value={data.password2} onChange={onInputChange} />
      </Form.Field>
    </Form>
  })
}
