import React from 'react'
import { Image, Label,TextArea, Form, Input, Button } from 'semantic-ui-react'

class Create extends React.Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
    this.handleCreate = this.handleClick.bind(this)

    this.state = {
      name: '',
      description: '',
      locations: [],
      logo: {
        src: '',
        files: []
      }
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

  handleInputFileChange(e, props) {
    this.setState({
      logo: {
        src: URL.createObjectURL(e.target.files[0]),
        files: e.target.files,
      }
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
        
        <Form.Input name="logo" onChange={this.handleInputFileChange} type="file" />
        <Image src={this.state.logo.src} size="small" />

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

