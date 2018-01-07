import React from 'react'
import { Label,TextArea, Form, Input, Button } from 'semantic-ui-react'

class Create extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCreate = this.handleClick.bind(this)

    this.state = {
      name: '',
      description: '',
      locations: [],
    }
  }

  handleClick() {
    const { onCreate } = this.props
    onCreate({
      name: this.state.name,
      description: this.state.description,
    })
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  render() {
    const { loading, onCancel } = this.props
    return (
      <Form>
        <Form.Input name="name" onChange={this.handleInputChange} label="Name" type="text"/>
        <Form.Field>
          <label>Description</label>
          <TextArea name="description" onChange={this.handleInputChange} label="Password" type="password"/>
        </Form.Field>

        <Button loading={loading} disabled={loading} 
          default
          onClick={this.handleClick}
        >Create</Button>

        <Button default
          onClick={this.onCancel}
        >
          Cancel
        </Button>
      </Form>
    )
  }
}

export default Create

