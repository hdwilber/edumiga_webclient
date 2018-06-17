import React from 'react'
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react'
import FormGeneral from '../../components/institution/form-general'
import InputLocation from '../../components/location/input-location'

import { parseData, buildData, Institution } from '../../utils/types'
import { Actions } from '../../utils/constants'

class FastEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state ={
      ...parseData(Institution, props.institution),
      isNew: !props.institution,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { institution } = nextProps

    if (typeof institution !== 'undefined') {
      this.setState({
        ...parseData(Institution, institution),
        isNew: !institution,
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
    const { institution, dependencies, onAction } = this.props
    onAction(Actions.save, {
      ref: institution,
      dependency: buildData(Institution, this.state, { dependencies }),
      isNew: this.state.isNew,
    })
  }
  render() {
    const { location, logo, dependencies, opportunities } = this.state
    const { visible, 
      processing,
      onCancel,
      constants = {},
    } = this.props

    return (
      <Modal closeOnDimmerClick={false} 
        closeOnDocumentClick={false} 
        onClose={onCancel} size="fullscreen" open={visible}
      >
        { this.renderHeader() }
        <Modal.Content>
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column width={16}>
                <Segment>
                  <Header size="medium">Overview</Header>
                  <FormGeneral 
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