import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon, Grid, Button, Segment, Header } from 'semantic-ui-react'

import { InputImage } from '../../../components/media'

import { FormGeneral } from '../../../components/opportunity'
import { Input as InputInstitution } from '../../../components/institution'

import * as institutionActions from '../../../redux/institution/actions'
import * as opportunityActions from '../../../redux/opportunity/actions'

import { CourseFastEditor } from '../../shared'
import CourseList from '../../../components/course/list'
import { Actions } from '../../../utils/constants'

import withAuthorization, { UserState } from '../../../containers/authorization'
import withApiService from '../../../containers/withApiService'
import { withTypesManager } from '../../shared/types'


class Editor extends React.PureComponent {
  constructor(props) {
    super(props)

    const { typesManager: { opportunity } } = props
    this.state = {
      ...opportunity.format(null),

      isNew: true,
      showCourseFastEditor: false,
      courseFastEditor: {
        value: null,
      }
    }
  }

  findOpportunity(id) {
    if (id) {
      const { typesManager: { opportunity } } = this.props
      opportunity.findOne(id)
    }
  }

  componentDidMount() {
    const { match } = this.props
    const { opportunityId } = match.params

    this.findOpportunity(opportunityId)
  }

  componentWillReceiveProps(nextProps) {
    const { opportunity, location: nextLocation, match: nextMatch } = nextProps

    if (typeof nextLocation !== 'undefined') {
      const { location } = this.props
      if (nextLocation.key !== location.key) {
        const { opportunityId } = nextMatch.params
        this.findOpportunity(opportunityId)
      }
    }
    if (typeof opportunity !== 'undefined') {
      if (opportunity && opportunity.id) {
        const { match } = this.props
        const { opportunityId } = match.params
        if (!opportunityId && this.state.isNew)
          this.props.history.push(`/opportunity/${opportunity.id}/editor`)
      }
      this.setState({
        ...this.props.typesManager.opportunity.format(opportunity),
        isNew: !opportunity,
      }, () => {
        window.scroll(window.top)
      })
    }
  }

  handleSave = () => {
    //const { save, opportunity } = this.props
    //save(this.state, { opportunity } )
    const { typesManager: { opportunity } } = this.props
    opportunity.save(this.state)
  }

  handleInputChange = (e, props) => {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleAddCourse = () => {
    this.setState({
      showCourseFastEditor: true,
      courseFastEditor: {
        value: null,
      }
    })
  }

  actionCourseFastEditor = (action, { ref, value, isNew } ) => {
    switch(action) {
      case Actions.save: 
        //const { typesManager: { course } } = this.props
        const { courses } = this.state
        const newList = isNew
          ? courses.concat([value])
          : courses.map(c => (c === ref) ? ({ ...c, ...value }): c)

        this.setState({
          courses: newList,
          showCourseFastEditor: false,
          courseFastEditor: {
            value: null,
          }
        })
        
        break;
    }
  }

  closeCourseFastEditor = () => {
    this.setState({
      showCourseFastEditor: false,
      courseFastEditor: {
        value: null,
      }
    })
  }

  courseListClickAction = (action, course) => {
    switch(action) {
      case Actions.fastEdit:
        this.setState({
          showCourseFastEditor: true,
          courseFastEditor: {
            value: course,
          }
        })
        break;
    }
  }

  renderCoursesActionButtons() {
    return (
      <Button.Group floated="right" size='medium'>
        <Button 
          onClick={this.handleAddCourse}
          primary
        >
          <Icon name="plus" />Create
        </Button>
      </Button.Group>
    )
  }

  renderActionButtons() {
    const { isNew } = this.state
    return (
      <Button.Group floated="right" size='medium'>
        <Button 
          onClick={this.handleSave}
          primary
        >
          <Icon name={isNew ? 'plus': 'save'} />{ isNew ? 'Create': 'Save' }
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
          {isNew ? "Create a new Opportunity": name}
          { this.renderActionButtons() }
        </Header>
      </Grid.Column>
    )
  }
  render() {
    const { logo, institution, courses } = this.state
    const { institutions, constants } = this.props
    const { showCourseFastEditor } = this.state

    return (
      <Grid container stackable>
        <Grid.Column width={16}>
          { this.renderHeader() }
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <InputInstitution name="institution" value={institution}
              institutions={institutions}
              onChange={this.handleInputChange}
              unselected="This opportunity does not belong to an institution. Add one"
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
          <Segment>
            <Header size="medium">Overview</Header>
            <FormGeneral onChange={this.handleInputChange}
              value={this.state}
              constants={constants}
            />
          </Segment>

          <Segment>
            <Header size="medium">Courses
              {this.renderCoursesActionButtons()}
            </Header>
            <CourseList items={courses}
              onClickAction={this.courseListClickAction}
            />
          </Segment>
        </Grid.Column>
        { showCourseFastEditor && (
          <CourseFastEditor
            onAction={this.actionCourseFastEditor}
            onCancel={this.closeCourseFastEditor}
            visible={this.state.showCourseFastEditor}
            courses={courses}
            {...this.state.courseFastEditor}
          />
        )}
      </Grid>
    )
  }
}

function mapStateToProps (state) {
  const { institution, opportunity } = state
  return {
    institutions: institution.list,
    opportunity: opportunity.current,
    processing: opportunity.loading,
    constants: {
      ...opportunity.constants,
    }
  }
}

function mapDispatchToProps(dispatch) {
  dispatch(opportunityActions.getTypes())
  dispatch(institutionActions.findAllOwned())

  return {
    //save: (data, opts) => dispatch(opportunityActions.save(data, opts)),
    //find: (id, opts) => dispatch(opportunityActions.findById(id, opts)),
    //create: (data, opts) => dispatch(opportunityActions.create(data, opts)),
    //update: (data, opts) => dispatch(opportunityActions.update(data, opts)),
    //delete: (data, opts) => dispatch(opportunityActions.deletex(data, opts)),
  }
}


const ConnectedOpportunity = connect(mapStateToProps, mapDispatchToProps)(withRouter(Editor))

export default withTypesManager(withApiService(withAuthorization(ConnectedOpportunity, [UserState.ACCOUNT])))

