import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import InputImage from '../../components/media/input-image'
import InputLocation from '../../components/location/input-location'

import FormGeneral from '../../components/institution/form-general'

import * as institutionActions from '../../redux/institution/actions'
import * as categoryActions from '../../redux/category/actions'
import { parseData, buildData, Institution } from '../../utils/types'

import InstList from '../../components/institution/list'
import OppList from '../../components/opportunity/list'

import { Actions } from '../../utils/constants'

import withAuthorization, { UserState } from '../../containers/authorization'
import InstitutionFastEditor from './fast-editor'

class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...parseData(Institution),
      isNew: true,
      showInstFastEditor: false,
      instInstFastEditor: {
        institution: null,
      }
    }
  }

  componentDidMount() {
    const { match, find } = this.props
    const { institutionId } = match.params
    this.findInstitution(institutionId)
  }

  findInstitution(id) {
    if (id) {
      const { find } = this.props
      find(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { institution, location: nextLocation, match: nextMatch } = nextProps

    if (typeof nextLocation !== 'undefined') {
      const { location } = this.props
      if (nextLocation.key !== location.key) {
        const { institutionId } = nextMatch.params
        this.findInstitution(institutionId)
      }
    }
    if (typeof institution !== 'undefined') {
      this.setState({
        ...parseData(Institution, institution),
        isNew: !institution,
      }, () => {
        window.scroll(window.top)
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

  handleDepActions = (action, dependency) => {
    switch(action) {
      case Actions.fastEdit: 
        this.setState({
          showInstFastEditor: true,
          instFastEditor: {
            ...this.state.instFastEditor,
            institution: dependency,
          }
        })
        break;
      case Actions.fullEdit:
        const { history } = this.props
        history.push(`/institution/${dependency.id}/editor`)
        break
      default: 
    }
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

  renderFormGeneral() {
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

  closeInstFastEditor = () => {
    this.setState({
      showInstFastEditor: false,
      instFastEditor: {
        institution: null,
      }
    })
  }

  render() {
    const { location, logo, dependencies, opportunities } = this.state
    const { constants, processing } = this.props
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
          { this.renderFormGeneral() }
          <Button
            loading={processing}
            disabled={processing}
            default
            onClick={this.handleSave}
          >
            Save
          </Button>
        </Grid.Column>

        <Grid.Column width={8}>
          <Segment>
            <Header size="medium">Dependencies <Button default onClick={this.handleAddDependency}>Add</Button></Header>
            <InstList items={dependencies}
              onSelectRow={e => console.log(e)}
              onClickAction={this.handleDepActions}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Header size="medium">Opportunities <Button default onClick={this.handleAddOpportunity}>Add</Button></Header>
            <OppList 
              items={opportunities} 
              onSelectRow={e => console.log(e)}
              onClickAction={(e) => console.log('click action: %o', e)}
            />
          </Segment>
        </Grid.Column>
        <InstitutionFastEditor 
          visible={this.state.showInstFastEditor} 
          {...this.state.instFastEditor}
          constants={constants}
          onCancel={this.closeInstFastEditor}
        />
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

