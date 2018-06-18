import React from 'react'
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react'
import { parseData, buildData, Institution } from '../../utils/types'
import { Actions } from '../../utils/constants'

class FastEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    const { specs, value } = props
    this.state ={
      ...parseData(specs, value),
      isNew: !props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps

    if (typeof value !== 'undefined') {
      const { specs } = this.props
      this.setState({
        ...parseData(specs, value),
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
    const { specs, value, onAction } = this.props
    onAction(Actions.save, {
      ref: value,
      value: buildData(specs, this.state),
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
      <Modal onClose={onCancel} size="fullscreen" open={visible} >
        { this.renderHeader() }
        <Modal.Content>
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column width={11}>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}

export default FastEditor
