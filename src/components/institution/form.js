import React from 'react'
import { Image, Label,TextArea, Form, Input, Button } from 'semantic-ui-react'

class InstForm extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
    this.handleCreate = this.handleClick.bind(this)

    const { institution } = props
    console.log(institution)
    this.state = {
      name: institution.name,
      description: institution.description,
    }
  }

  handleClick() {
    const { onSave } = this.props
    onSave({
      name: this.state.name,
      description: this.state.description,
    })
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
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
    const { loading } = this.props
    return (
      <Form>
        <Form.Input value={this.state.name} name="name" onChange={this.handleInputChange} label="Name" type="text"/>
        <Form.Field>
          <label>Description</label>
          <TextArea value={this.state.description} name="description" onChange={this.handleInputChange} label="Password" type="password"/>
        </Form.Field>
        
        <Button loading={loading} disabled={loading} 
          default
          onClick={this.handleClick}
        >Save</Button>

      </Form>
    )
  }
}

export default InstForm

