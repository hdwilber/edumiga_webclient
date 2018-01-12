import React from 'react'
import { Checkbox, Button, Modal, TextArea, Input, Form } from 'semantic-ui-react'

class OppForm extends React.Component {
  constructor(props) {
    super(props)
    if (props.opportunity) {
      const { name, description, draft, duration } = props.opportunity
      this.state = {
        name,
        description,
        draft,
        duration,
      }
    } else {
      this.state ={
        name : '',
        description: '',
        draft: true,
        duration: 0,
      }
    }

    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
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
      const { name, description, draft, duration } = nextProps.opportunity
      this.setState({
        name,
        description,
        draft,
        duration,
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

  render() {
    const { onSave, onCancel, visible } = this.props
    const { name, description, draft, duration } = this.state
    return (
      <Modal open={visible} >
        <Modal.Header>Enter a new Opportunity</Modal.Header>
        <Modal.Content image>

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

        </Modal.Content>
      </Modal>
    )
  }
}

export default OppForm
