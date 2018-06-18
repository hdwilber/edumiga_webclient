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

class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...parseData(Institution),
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
    const { save } = this.props
    save(this.state, { })
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
    
    return (
      <Button.Group floated="right" size='medium'>
        <Button 
          primary
          disabled={processing}
          onClick={this.handleSave}
        >
          <Icon name={isNew ? 'plus': 'save'} />{ isNew ? 'Create': 'Save' }
        </Button>
        <Button 
          disabled={processing}
          as={Link}
          to={`/institution/${id}`}
          secondary
        >
          <Icon name="eye" />
          View
        </Button>
        <Button secondary><Icon name="remove" />Delete</Button>
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

  
  actionInstFastEditor = (action, { ref, dependency, isNew}) => {
    switch(action) {
      case Actions.save: 
        const { dependencies } = this.state
        const newList = isNew
          ? dependencies.concat([dependency])
          : dependencies.map(d => (d === ref) ? ({ ...d, ...dependency }): d)

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

  actionOppFastEditor = (action, { ref, opportunity, isNew}) => {
    switch(action) {
      case Actions.save: 
        const { opportunities } = this.state
        const newList = isNew
          ? opportunities.concat([opportunity])
          : opportunities.map(o => (o === ref) ? ({ ...o, ...opportunity }): o)

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
          onAction={this.actionOpptFastEditor}
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

export default withAuthorization(ConnectedEditor, [UserState.ACCOUNT])

