import React from 'react'
import { Segment, Header, Checkbox, Button, Modal, TextArea, Input, Form } from 'semantic-ui-react'
import { default as ImageUploader } from '../../components/media/image-uploader'

import { buildImageUrl } from '../../redux/utils'

class OppForm extends React.Component {
  constructor(props) {
    super(props)
    if (props.opportunity) {
      const { logo, name, description, draft, duration } = props.opportunity
      this.state = {
        name,
        description,
        draft,
        duration,
        logo: {
          file: null,
          url: logo ? (buildImageUrl(logo.url)): '',
          fakeUrl: '',
        }
      }
    } else {
      this.state ={
        name : '',
        description: '',
        draft: true,
        duration: 0,
        logo: {
          file: null,
          url: '',
          fakeUrl: '',
        }
      }
    }

    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleLogoChange = this.handleLogoChange.bind(this)
  }

  handleClickSave() {
    const { onSave } = this.props
    onSave({
      name: this.state.name,
      description: this.state.description,
      draft: this.state.draft,
      duration: this.state.duration,
    })
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps)

    if (nextProps.opportunity) {
      const { name, description, draft, duration, logo } = nextProps.opportunity
      this.setState({
        name,
        description,
        draft,
        duration,
        logo: {
          file: null,
          url: logo && (buildImageUrl(logo.url)),
          fakeUrl: '',
        },
      })
    } 
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleCheckboxChange(e, props) {
    this.setState({
      [props.name]: props.checked,
    })
  }

  handleLogoChange(e, props) {
    const files = e.target.files
    const name = 'logo'
    this.setState({
      [name]: {
        ...this.state[name],
        file: files[0],
        fakeUrl: URL.createObjectURL(files[0]),
      }
    })
  }

  render() {
    const { onSave, onLogoUpload, onCancel, visible } = this.props
    const { name, description, draft, duration, logo } = this.state
    console.log(logo)
    return (
      <Modal open={visible} >
        <Modal.Header>Enter a new Opportunity</Modal.Header>
        <Modal.Content image>

          <Segment>
            <Header size="normal">Logo Profile</Header>
            <ImageUploader
              onFileChange={this.handleLogoChange}
              url={logo.fakeUrl === '' ? logo.url : logo.fakeUrl }
            />
            <Button disabled={!logo.fakeUrl} onClick={onLogoUpload}>Upload</Button>
          </Segment>

          <Segment>
            <Form>
              <Form.Input value={name} name="name" onChange={this.handleInputChange} />

              <Form.Field>
                <label>Description</label>
                <TextArea value={description} name="description" 
                  onChange={this.handleInputChange} 
                  label="Password" type="password"
                />
              </Form.Field>
              
              <Form.Input value={duration} name="duration" onChange={this.handleInputChange} />

              <Form.Field>
                <Checkbox label="Keep it as draft?" checked={draft} name="draft"
                  onChange={this.handleCheckboxChange}
                />
              </Form.Field>

              <Button.Group>
                <Button default onClick={this.handleClickSave} >Save</Button>
                <Button secondary onClick={onCancel} >Cancel</Button>
              </Button.Group>
            </Form>
          </Segment>

        </Modal.Content>
      </Modal>
    )
  }
}

export default OppForm
