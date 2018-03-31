import React from 'react'
import { Form as FinalForm, Field as FinalField } from 'react-final-form'
import { Transition, Message, Form, Input, Label, Button } from 'semantic-ui-react'

function validateEmail (value) {
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? 'Not valid email': ''
}

const CustomFinalField = (props) => {
  const { required, validations, name, type, label, placeHolder } = props
    
  function validate(value, values) {
    switch(type) {
      case 'email': return validateEmail(value)
    }
  }

  function renderField (fieldProps) {
    const { meta, input } = fieldProps
    return (
      <Form.Field>
        <label>{label}</label>
        <Input type={type} placeholder={placeHolder}
          {...input}
          error={meta.touched && meta.error}
        />

        {(meta.touched && meta.error) && (
          <Label basic color='red' pointing>{meta.error}</Label>
        )}
        
      </Form.Field>
    )
  }
  
  return (
    <FinalField 
      name={name}
      type={type}
      validate={validate}
    >
      { renderField } 
    </FinalField>
  )
}

const CustomFinalForm = (props) => {
  const { error, onSubmit, submitLabel, errorMessage, loading } = props
  function renderForm(formProps) {
    const { handleSubmit, pristine, validate } = formProps
    return ( 
      <Form onSubmit={handleSubmit}
      >
        <Transition
          duration={500}
          visible={error}
        >
          <Message negative>{errorMessage}</Message>
        </Transition>

        { props.children }

        <Button loading={loading}
          default
          onClick={handleSubmit}
        >
          {submitLabel}
        </Button>

      </Form>
    )
  }

  return (
    <FinalForm
      onSubmit={onSubmit}
      render={renderForm}
    />
  )
}

export { CustomFinalForm as FinalForm } 
export { CustomFinalField as FinalField }
