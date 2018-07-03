import React from 'react'
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react'
import { parseData, buildData } from '../../utils/types'
import { Actions } from '../../utils/constants'

class FastEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    const { specs, value } = props
    const newValue = value || parseData(specs, null)
    this.state = {
      ...newValue,
      isNew: !props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps

    if (typeof value !== 'undefined') {
      const { specs } = this.props
      const newValue = value || parseData(specs, null)
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
    const { specs, value, onAction, constants } = this.props
    //const data = buildData(specs, this.state, constants)
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

    return (
      <Modal onClose={onCancel} open={visible} >
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
                Add
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
