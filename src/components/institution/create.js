import React from 'react'
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react'
import SimpleMediaUploader from '../../components/media/image-uploader'
import FormOverview from './form-overview'

import { Institution as InstTemplate, format, formatOutput, } from '../../types'

import { buildImageUrl } from '../../redux/utils'

class InstForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...format(props.institution)
    }
    console.log('###############')
    console.log(this.state)

    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleClickSave() {
    const { onSave } = this.props
    onSave({
      ...format(this.state)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.institution) {
      this.setState({
        data: format(nextProps.institution),
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
    return (
      <Modal size="large" open={visible} >
        <Modal.Header>Enter a new Dependency</Modal.Header>
        <Modal.Content image>
          <Grid container>
            <Grid.Column width={5}>
              <Segment>
                <Header size="medium">Logo Profile</Header>
      {logo &&(
                <SimpleMediaUploader
                  name="logo"
                  onChange={this.handleInputChange}
                  onUpload={onLogoUpload}
                  disabled={false}
                  url={this.state.logo && (this.state.logo.fakeUrl === '' ? this.state.logo.url : this.state.logo.fakeUrl) }
                />
      )}
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
