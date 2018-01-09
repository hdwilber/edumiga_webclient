import React from 'react'
import { Checkbox, Image, Label,TextArea, Form, Input, Button } from 'semantic-ui-react'

class InstForm extends React.Component {

  constructor(props) {
    super(props)
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
  }

  handleInputFileChange(e, props) {
    this.setState({
      logo: {
        src: URL.createObjectURL(e.target.files[0]),
        files: e.target.files,
      }
    })
  }

  render() {
    const { onInputChange, loading, name, description, draft  } = this.props
    return (
      <Form>
        <Form.Input value={name} name="name" onChange={onInputChange} 
          label="Name" type="text"
        />
        <Form.Field>
          <label>Description</label>
          <TextArea value={description} name="description" 
            onChange={onInputChange} 
            label="Password" type="password"
          />
        </Form.Field>

        <Form.Field>
          <Checkbox label="Keep it as draft?" checked={draft} name="draft"
            onChange={onInputChange}
          />
        </Form.Field>
      </Form>
    )
  }
}

export default InstForm

