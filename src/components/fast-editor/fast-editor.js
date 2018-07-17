import React from 'react'
import { Segment, Header, Button, Modal } from 'semantic-ui-react'
import { format } from '../../utils/converters'
import { Actions } from '../../utils/constants'

class FastEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    const { specs, value } = props
    const newValue = value || format(specs, null)
    this.state = {
      ...newValue,
      isNew: !props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps

    if (typeof value !== 'undefined') {
      const { specs } = this.props
      const newValue = value || null
      this.setState({
        ...newValue,
        isNew: !value,
      })
    }
  }

  handleInputChange = (event, props) => {
    this.setState({
      [props.name]: props.value
    })
  }

  renderHeader() {
    const { isNew } = this.state
    return (
        <Modal.Header>{ isNew ? 'Create': 'Edit' }</Modal.Header>
    )
  }

  handleClickSave = () => {
    const { value, onAction } = this.props
    const data = this.state
    onAction(Actions.save, {
      ref: value,
      value: data,
      isNew: this.state.isNew,
    })
  }
  render() {
    const { visible, 
      content: Content,
      processing,
      onCancel,
      constants = {},
    } = this.props
    const { isNew } = this.state

    return (
      <Modal 
        closeOnDocumentClick={false} 
        closeOnDimmerClick={false} 
        onClose={onCancel} open={visible}
        closeIcon
      >
        { this.renderHeader() }
        <Modal.Content>
          <Segment>
            <Header size="medium">Overview</Header>
            
            <Content
              onChange={this.handleInputChange}
              value={this.state}
              constants={constants}
            />

            <Button.Group>
              <Button default 
                onClick={this.handleClickSave} 
                loading={processing}
                disabled={processing}
              >
                { isNew ? 'Add': 'Update' }
              </Button>
              <Button secondary onClick={onCancel} >Cancel</Button>
            </Button.Group>
          </Segment>
        </Modal.Content>
      </Modal>
    )
  }
}

export default FastEditor
