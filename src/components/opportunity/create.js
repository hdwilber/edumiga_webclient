import React from 'react'
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react'
import SimpleMediaUploader from '../../components/media/image-uploader'
import FormOverview from './form-overview'

import { buildImageUrl } from '../../redux/utils'
import { Opportunity as OppTemplate, format, formatOutput } from '../../types'

class OppForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = format(OppTemplate, props.opportunity)

    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleClickSave() {
    const { onSave } = this.props
    onSave({
      ...formatOutput(OppTemplate, this.state)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.opportunity !== undefined) {
      this.setState({
        ...format(OppTemplate, nextProps.opportunity),
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
    const { logo } = this.state

    if (constants) {
      return (
        <Modal size="large" open={visible} >
          <Modal.Header>Enter a new Opportunity</Modal.Header>
          <Modal.Content image>
            <Grid container>
              <Grid.Column width={5}>
                <Segment>
                  <Header size="medium">Logo Profile</Header>
                  <SimpleMediaUploader
                    name="logo"
                    onChange={this.handleInputChange}
                    onUpload={onLogoUpload}
                    disabled={false}
                    url={this.state.logo.fakeUrl === '' ? this.state.logo.url : this.state.logo.fakeUrl }
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
    } else {
      return <Header>Loading...</Header>
    }
  }
}

export default OppForm
