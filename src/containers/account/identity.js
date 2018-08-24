import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Segment, Button, Grid, Header } from 'semantic-ui-react'

import { InputImage } from '../../components/media'
import FormIdentity from '../../components/account/form-identity'

import * as accountActions from '../../redux/account/actions'
import * as constantsActions from '../../redux/constants/actions'

import withAuthorization, { UserState } from '../authorization'
import withApiService from '../withApiService'
import { withTypesManager } from '../shared/types'

class Identity extends React.Component {
  constructor(props){
    super(props)

    const { typesManager: { identity } } = props
    this.state = {
      ...identity.format(),
      isNew: true,
    }
  }

  componentDidMount() {
    const { constantsGet } = this.props
    constantsGet(['countries', 'categories'])
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const { identity: next } = nextProps
    if (typeof next !== 'undefined') {
      const { typesManager: { identity }  } = this.props
      this.setState({
        ...identity.format(next)
      })
    }
  }
  
  handleClickSave = () => {
    const { identity: initial, typesManager: {  identity } } = this.props
    identity.save(this.state, initial)
  }

  handleInputChange = (e, props) => {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleClickUploadPhoto = () => {
    if(this.state.photo.file) {
      const { uploadPhoto } = this.props
      uploadPhoto(this.state.photo.file)
    }
  }

  render() {
    const { identity, constant } = this.props
    if (identity) {
      const { photo } = this.state
      return (
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="huge">Profile Settings</Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <InputImage
                  name="photo" 
                  onChange={this.handleInputChange}
                  value={photo}
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
    }
    return null
  }
}

function mapStateToProps (state) {
  return {
    identity: state.account.identity,
    constant: state.constant,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    identityUpdate: (data) => dispatch(accountActions.updateIdentity(data)),
    uploadPhoto: (file) => dispatch(accountActions.uploadPhoto(file)),
    constantsGet: (list) => dispatch(constantsActions.get(list)),
  }
}

const ConnectedIdentity = connect(mapStateToProps, mapDispatchToProps) (withRouter(Identity))

export default withTypesManager(withApiService(withAuthorization(ConnectedIdentity, [UserState.ACCOUNT])))
