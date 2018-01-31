import React from 'react'
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react'
import SimpleMediaUploader from '../../components/media/image-uploader'
import FormOverview from './form-overview'
import LocationMap from '../../components/location/map'

import { Institution as InstTemplate, format, formatOutput, } from '../../types'

import { buildImageUrl } from '../../redux/utils'

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
      })
    } 
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  render() {
    const { constants, onLogoUpload, onCancel, visible } = this.props
    const { isNew, location, logo } = this.state
    return (
      <Modal size="large" open={visible} >
        <Modal.Header>Enter a new Dependency</Modal.Header>
        <Modal.Content image>
          <Grid container>
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
          </Grid>

        </Modal.Content>
      </Modal>
    )
  }
}

export default InstForm
