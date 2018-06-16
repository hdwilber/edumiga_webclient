import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import InputImage from '../../components/media/input-image'
import InputLocation from '../../components/location/input-location'

import FormGeneral from '../../components/institution/form-general'

import * as institutionActions from '../../redux/institution/actions'
import * as categoryActions from '../../redux/category/actions'
import { parseData, saveData, Institution } from '../../utils/types'
import withAuthorization, { UserState } from '../../containers/authorization'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...parseData(Institution),
      isNew: true,
    }
  }

  componentDidMount() {
    const { match, find } = this.props
    const { institutionId } = match.params
    if (institutionId) {
      find(institutionId)
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

  handleSave = (event) => {
    console.log(this.state)
  }

  renderHeader() {
    const { isNew, name } = this.state
    return (
      <Grid.Column width={16}>
        <Header size="huge">
          {isNew ? "Create a new Institution": name}
        </Header>
      </Grid.Column>
    )
  }

  renderOverviewForm() {
    const { constants } = this.props
    return (
      <Segment>
        <Header size="medium">Overview</Header>
        <FormGeneral 
          onChange={this.handleInputChange}
          value={this.state}
          constants={constants}
        />
      </Segment>
    )
  }

  render() {
    const { location, logo } = this.state
    const { processing } = this.props
    return (
      <Grid container stackable>
        { this.renderHeader() }
        <Grid.Column width={6}>
          <Segment>
            <Header size="medium">Logo Profile</Header>
            <InputImage
              name="logo" 
              onChange={this.handleInputChange}
              value={logo}
            />
          </Segment>
          <Segment>
            <Header size="medium">Location</Header>
            <InputLocation
              name="location"
              onChange={this.handleInputChange}
              value={location}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          { this.renderOverviewForm() }
          <Button
            loading={processing}
            disabled={processing}
            default
            onClick={this.handleSave}
          >
            Save
          </Button>
        </Grid.Column>
      </Grid>
      )
  }
}

function mapStateToProps (state) {
  return {
    institution: state.institution.current,
    processing: state.institution.loading,
    constants: {
      ...state.institution.constants,
      categories: state.category.list,
    }
  }
}

function mapDispatchToProps (dispatch) {
  dispatch(categoryActions.findAll())
  dispatch(institutionActions.getTypes())

  return {
    find: (id, opts) => dispatch(institutionActions.findById(id, opts)),
    create: (data, opts) => dispatch(institutionActions.create(data, opts)),
    update: (data, opts) => dispatch(institutionActions.update(data, opts)),
    delete: (data, opts) => dispatch(institutionActions.deleteI(data, opts)),
  }
}

const ConnectedEditor = connect(mapStateToProps, mapDispatchToProps)(withRouter(Editor))

export default withAuthorization(ConnectedEditor, [UserState.ACCOUNT])

