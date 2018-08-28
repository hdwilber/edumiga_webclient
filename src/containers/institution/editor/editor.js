import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Icon, Button, Grid, Header, Segment } from 'semantic-ui-react'
import { InputImage } from '../../../components/media'
import { 
  FormGeneral,
  Input as InputInstitution 
} from '../../../components/institution'

import * as categoryActions from '../../../redux/category/actions'

import { List as InstList } from '../../../components/institution'
import { List as OppList } from '../../../components/opportunity'

import { Actions } from '../../../utils/constants'
import * as constantsActions from '../../../redux/constants/actions'

import withAuthorization, { UserState } from '../../authorization'
import { InstitutionFastEditor, OpportunityFastEditor } from '../../shared'


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
    const { constantsGet, match } = this.props
    const { institutionId } = match.params
    this.findInstitution(institutionId)
    const { typesManager: { institution, opportunity } } = this.props
    opportunity.getTypes()
    institution.getTypes()

    constantsGet(['countries', 'categories'])
  }

  findInstitution(id) {
    if (id) {
      const { typesManager: { institution } } = this.props
      institution.findOne(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { institution: next, location: nextLocation, match: nextMatch } = nextProps

    if (typeof nextLocation !== 'undefined') {
      const { location } = this.props
      if (nextLocation.key !== location.key) {
        const { institutionId } = nextMatch.params
        this.findInstitution(institutionId)
      }
    }
    if (typeof next !== 'undefined') {
      const { typesManager: { institution } } = this.props
      this.setState({
        ...institution.format(next),
        isNew: !next,
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
    const { institution: current, typesManager: { institution } } = this.props
    institution.save(this.state, current)
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
  const { institution, opportunity, constant } = state
  return {
    institution: institution.current,
    institutions: institution.list,
    processing: institution.loading,
    constants: {
      ...institution.constants,
      ...opportunity.constants,
      categories: state.category.list,
      countries: constant.constants.countries,
    }
  }
}

function mapDispatchToProps (dispatch) {
  dispatch(categoryActions.findAll())
  return {
    constantsGet: (list) => dispatch(constantsActions.get(list)),
  }
}

const ConnectedEditor = connect(mapStateToProps, mapDispatchToProps)(withRouter(Editor))

export default withAuthorization(ConnectedEditor, [UserState.ACCOUNT])

