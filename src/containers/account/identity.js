import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Segment, Button, Grid, Header } from 'semantic-ui-react'

import FormIdentity from '../../components/account/form-identity'
import SimpleMediaUploader from '../../components/media/image-uploader'

import * as accountActions from '../../redux/account/actions'

import { buildImageUrl } from '../../redux/utils'

class Identity extends React.Component {
  constructor(props){
    super(props)

    const { account } = props

    if (account && account.identity){
      const { 
        displayName, title, firstName, lastName,
        birthDate, occupation, location, country, state,
        county, address, phone, interests, photo } = account.identity

      this.state = {
        displayName, title, firstName, lastName,
        birthDate, occupation, location, country, state,
        county, address, phone, interests: interests || [], 
        photo: photo ? {
          file: null,
          url: (buildImageUrl(photo.url)),
          fakeUrl: '',
        } : { file:null, url: '', fakeUrl: ''},
      }
    }

    this.serializeData = this.serializeData.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleClickUploadPhoto = this.handleClickUploadPhoto.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps
    if (account && account.identity) {
      const { identity } = account
      const { 
        displayName, title, firstName, lastName,
        birthDate, occupation, location, country, state,
        county, address, phone, interests, photo } = identity

      this.setState({
        displayName, title, firstName, lastName,
        birthDate, occupation, location, country, state,
        county, address, phone, 
        interests: interests || [], 
        photo: photo ? {
          file: null,
          url: (buildImageUrl(photo.url)),
          fakeUrl: '',
        } : { file:null, url: '', fakeUrl: ''},
      })
    }
  }
  
  handleClickSave() {
    const { account, identityUpdate } = this.props
    const data = this.serializeData()
    const { identity } = account
    if (identity) {
      identityUpdate({
        id: identity.id,
        ...data,
      })
    }
  }

  handleInputChange(e, props) {
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

  serializeData() {
    const identity = this.props.account.identity
    const { 
      displayName, title, firstName, lastName,
      birthDate, occupation, location, country, state,
      county, address, phone, interests } = this.state

    return {
      id: identity.id,
      displayName, title, firstName, lastName,
      birthDate, occupation, location, country, state,
      county, address, phone, interests: interests || [],
    }
  }

  render() {
    const { account } = this.props

    if (account && account.identity) {
      const data = this.serializeData()
      const { photo } = this.state
      return (
        <Grid container>
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
                data={data}
              />
            </Segment>

            <Button.Group>
              <Button primary onClick={this.handleClickSave}>Save</Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      )
    } else {
      return <Header>Loading...</Header>
    }
  }
}

export default connect((state) => ({
  account: state.account
}), (dispatch) => ({
  identityUpdate: (data) => dispatch(accountActions.updateIdentity(data)),
  uploadPhoto: (file) => dispatch(accountActions.uploadPhoto(file)),
})) (withRouter(Identity))
