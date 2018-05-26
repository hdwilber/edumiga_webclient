import React from 'react'
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react'
import FormOverview from './form-overview'
import LocationMap from '../../components/location/map'

import { Institution as InstTemplate, format, formatOutput, } from '../../types'

class InstForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...format(InstTemplate, props.institution),
      isNew: !props.institution,
      currentLocation: {
        point: {
          lat: 0,
          lng: 0,
        },
        zoom: 3,
      }
    }

    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleClickSave() {
    const { onSave } = this.props
    onSave({
      ...formatOutput(InstTemplate, this.state)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.institution) {
      this.setState({
        ...format(InstTemplate, nextProps.institution),
        isNew: false,
      })
    } 
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  render() {
    const { constants, onCancel, visible } = this.props
    const { isNew, location } = this.state
    return (
      <Modal closeOnDocumentClick onClose={onCancel} size="fullscreen" open={visible} >
        <Modal.Header>{ isNew ? 'Enter a new Dependency': 'Edit dependency' }</Modal.Header>
        <Modal.Content>
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column width={5}>
                <Segment>
                  <Header size="medium">Location</Header>
                  <LocationMap
                    name="location"
                    onCenterChange={this.handleInputChange}
                    data={location.point ? location : this.state.currentLocation}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={11}>
                <Segment>
                  <FormOverview onInputChange={this.handleInputChange}
                    data={this.state}
                    constants={constants}
                  />
                  <Button.Group>
                    <Button default onClick={this.handleClickSave} >Save</Button>
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

export default InstForm
