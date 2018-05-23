import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Segment, Button, Grid, Header } from 'semantic-ui-react'

import FormIdentity from '../../components/account/form-identity'
import SimpleMediaUploader from '../../components/media/image-uploader'

import * as accountActions from '../../redux/account/actions'
import * as constantsActions from '../../redux/constants/actions'

import { AccountIdentity as IdTemplate, format, formatOutput, } from '../../types'

class Identity extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      ...format(IdTemplate),
      isNew: true,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleClickUploadPhoto = this.handleClickUploadPhoto.bind(this)
  }

  componentDidMount() {
    const { constantsGet } = this.props
    constantsGet(['countries', 'categories'])
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps
    if (account && account.identity) {
      const { identity } = account
      this.setState({
        ...format(IdTemplate, identity)
      })
    }
  }
  
  handleClickSave() {
    const { account, identityUpdate } = this.props
    const { identity } = account
    if (identity) {
      identityUpdate({
        ...formatOutput(IdTemplate, this.state)
      })
    }
  }

  handleInputChange(e, props) {
    console.log(props)
    this.setState({
      [props.name]: props.value,
    })
  }

  handleClickUploadPhoto() {
    if(this.state.photo.file) {
      const { uploadPhoto } = this.props
      uploadPhoto(this.state.photo.file)
    }
  }

  render() {
    const { account, constant } = this.props

    if (account && account.identity) {
      const { photo } = this.state
      return (
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="huge">Profile Settings</Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <SimpleMediaUploader
                  name="photo" 
                  url={photo.fakeUrl === '' ? photo.url : photo.fakeUrl}
                  onChange={this.handleInputChange}
                  onUpload={this.handleClickUploadPhoto}
                  disabled={false}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment>
                <FormIdentity onInputChange={this.handleInputChange}
                  data={this.state}
                  constants={constant && constant.constants}
                />
              </Segment>

              <Button.Group>
                <Button primary onClick={this.handleClickSave}>Save</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    } else {
      return <Header>Loading...</Header>
    }
  }
}

export default connect((state) => ({
  account: state.account,
  constant: state.constant,
}), (dispatch) => ({
  identityUpdate: (data) => dispatch(accountActions.updateIdentity(data)),
  uploadPhoto: (file) => dispatch(accountActions.uploadPhoto(file)),
  constantsGet: (list) => dispatch(constantsActions.get(list)),
})) (withRouter(Identity))
