import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Icon, Button, Grid, Header, Segment } from 'semantic-ui-react'

import { InputImage } from '../../../components/media'
import { 
  FormGeneral,
  Input as InputInstitution 
} from '../../../components/institution'

import * as institutionActions from '../../../redux/institution/actions'
import * as opportunityActions from '../../../redux/opportunity/actions'
import * as categoryActions from '../../../redux/category/actions'
import { parseData, Institution } from '../../../utils/types'

import { List as InstList } from '../../../components/institution'
import { List as OppList } from '../../../components/opportunity'

import { Actions } from '../../../utils/constants'

import withAuthorization, { UserState } from '../../authorization'
import { InstitutionFastEditor, OpportunityFastEditor } from '../../shared'
import withApiService from '../../../containers/withApiService'
import withTypesManager from '../../withTypesManager'


class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    const { typesManager: { institution } } = props
    this.state = {
      ...institution.format(null),

      isNew: true,
      showInstFastEditor: false,
      instInstFastEditor: {
        value: null,
      },

      showOppFastEditor: false,
      oppFastEditor: {
        value: null,
      },
    }
  }

  componentDidMount() {
    const { match } = this.props
    const { institutionId } = match.params
    this.findInstitution(institutionId)
  }

  findInstitution(id) {
    if (id) {
      const { typesManager: { institution } } = this.props
        console.log('finding one')
      institution.findOne(id)
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
    const { save } = this.props
    const { typesManager } = this.props
    typesManager.institution.save(this.state, { })
  }

  handleOppActions = (action, opportunity) => {
    switch(action) {
      case Actions.fastEdit: 
        this.setState({
          showOppFastEditor: true,
          oppFastEditor: {
            ...this.state.oppFastEditor,
            value: opportunity,
          }
        })
        break;
      case Actions.fullEdit:
        const { history } = this.props
        history.push(`/opportunity/${opportunity.id}/editor`)
        break
      default: 
    }
  }
  handleDepActions = (action, dependency) => {
    switch(action) {
      case Actions.fastEdit: 
        this.setState({
          showInstFastEditor: true,
          instFastEditor: {
            ...this.state.instFastEditor,
            value: dependency,
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

  renderActionButtons() {
    const { id, isNew } = this.state
    const { processing } = this.props
    const targetLink = `/institution/${id}`
    const fallbackLink = '/institutions'
    
    return (
      <Button.Group floated="right" size='medium'>
        <Button 
          primary
          disabled={processing}
          onClick={this.handleSave}
        >
          <Icon name={isNew ? 'plus': 'save'} />{ isNew ? 'Create': 'Save' }
        </Button>
        { !isNew && (
          <Button 
            disabled={processing}
            as={Link}
            to={targetLink}
            secondary
          >
            <Icon name="eye" />
            View
          </Button>
        )}
        <Button secondary
          as={Link}
          to={fallbackLink}
        >
          <Icon name="remove" />{ isNew ? 'Cancel': 'Delete' }
        </Button>
      </Button.Group>
    )
  }

  renderHeader() {
    const { isNew, name } = this.state
    return (
      <Grid.Column width={16}>
        <Header size="huge">
          {isNew ? "Create a new Institution": name}
          { this.renderActionButtons() }
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

  
  actionInstFastEditor = (action, { ref, value, isNew}) => {
    switch(action) {
      case Actions.save: 
        const { dependencies } = this.state
        const newList = isNew
          ? dependencies.concat([value])
          : dependencies.map(d => (d === ref) ? ({ ...d, ...value }): d)

        this.setState({
          dependencies: newList,
          showInstFastEditor: false,
          instFastEditor: {
            value: null,
          }
        })
        break;
    }
  }

  actionOppFastEditor = (action, { ref, value, isNew}) => {
    switch(action) {
      case Actions.save: 
        const { opportunities } = this.state
        const newList = isNew
          ? opportunities.concat([value])
          : opportunities.map(o => (o === ref) ? ({ ...o, ...value }): o)

        this.setState({
          opportunities: newList,
          showOppFastEditor: false,
          oppFastEditor: {
            value: null,
          }
        })
        break;
    }
  }

  closeOppFastEditor = () => {
    this.setState({
      showOppFastEditor: false,
      oppFastEditor: {
        value: null,
      }
    })
  }

  closeInstFastEditor = () => {
    this.setState({
      showInstFastEditor: false,
      instFastEditor: {
        value: null,
      }
    })
  }

  handleAddDependency = () => {
    this.setState({
      showInstFastEditor: true,
      instFastEditor: {
        value: null,
      }
    })
  }

  handleAddOpportunity = () => {
    this.setState({
      showOppFastEditor: true,
      oppFastEditor: {
        value: null,
      }
    })
  }

  render() {
    const { logo, head, dependencies, opportunities } = this.state
    const { institutions, constants } = this.props
    return (
      <Grid container stackable>
        { this.renderHeader() }
        <Grid.Column width={6}>
          <Segment>
            <InputInstitution name="head" value={head}
              institutions={institutions}
              onChange={this.handleInputChange}
              unselected="This institution doesn't have a head institution"
            />
          </Segment>
          <Segment>
            <Header size="medium">Logo Profile</Header>
            <InputImage
              name="logo" 
              onChange={this.handleInputChange}
              value={logo}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          { this.renderFormGeneral() }
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
              onClickAction={this.handleOppActions}
            />
          </Segment>
        </Grid.Column>
        <InstitutionFastEditor 
          visible={this.state.showInstFastEditor} 
          constants={constants}
          onAction={this.actionInstFastEditor}
          onCancel={this.closeInstFastEditor}
          {...this.state.instFastEditor}
        />
        <OpportunityFastEditor
          visible={this.state.showOppFastEditor} 
          constants={constants}
          onAction={this.actionOppFastEditor}
          onCancel={this.closeOppFastEditor}
          {...this.state.oppFastEditor}
        />
      </Grid>
      )
  }
}

function mapStateToProps (state) {
  const { institution, opportunity } = state
  return {
    institution: institution.current,
    institutions: institution.list,
    processing: institution.loading,
    constants: {
      ...institution.constants,
      ...opportunity.constants,
      categories: state.category.list,
    }
  }
}

function mapDispatchToProps (dispatch) {
  dispatch(categoryActions.findAll())
  dispatch(institutionActions.getTypes())
  dispatch(opportunityActions.getTypes())
  dispatch(institutionActions.findAllOwned())

  return {
    find: (id, opts) => dispatch(institutionActions.findById(id, opts)),
    save: (data, opts) => dispatch(institutionActions.save(data, opts)),
    create: (data, opts) => dispatch(institutionActions.create(data, opts)),
    update: (data, opts) => dispatch(institutionActions.update(data, opts)),
    delete: (data, opts) => dispatch(institutionActions.deleteI(data, opts)),
  }
}

const ConnectedEditor = connect(mapStateToProps, mapDispatchToProps)(withRouter(Editor))

export default withTypesManager(withApiService(withAuthorization(ConnectedEditor, [UserState.ACCOUNT])))

