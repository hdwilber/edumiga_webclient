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

import { Opportunity, parseData } from '../../../utils/types'
import withAuthorization, { UserState } from '../../../containers/authorization'

class Editor extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ...parseData(Opportunity),

      isNew: true,
      showCourseFastEditor: false,
      courseFastEditor: {
        value: null,
      }
    }
  }

  findOpportunity(id) {
    if (id) {
      const { find } = this.props
      find(id)
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
      this.setState({
        ...parseData(Opportunity, opportunity),
        isNew: !opportunity,
      }, () => {
        window.scroll(window.top)
      })
    }
  }

  handleSave = () => {
    const { save, opportunity } = this.props
    save(this.state, { opportunity } )
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
    const { institutions, constants, processing } = this.props

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
              <Button default onClick={this.handleAddCourse}>
                Add
              </Button>
            </Header>
            <CourseList items={courses}
              onClickAction={this.courseListClickAction}
            />
          </Segment>
        </Grid.Column>
        <CourseFastEditor
          onAction={this.actionCourseFastEditor}
          onCancel={this.closeCourseFastEditor}
          visible={this.state.showCourseFastEditor}
          courses={courses}
          {...this.state.courseFastEditor}
        />
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
    save: (data, opts) => dispatch(opportunityActions.save(data, opts)),
    find: (id, opts) => dispatch(opportunityActions.findById(id, opts)),
    create: (data, opts) => dispatch(opportunityActions.create(data, opts)),
    update: (data, opts) => dispatch(opportunityActions.update(data, opts)),
    delete: (data, opts) => dispatch(opportunityActions.deletex(data, opts)),
  }
}


const ConnectedOpportunity = connect(mapStateToProps, mapDispatchToProps)(withRouter(Editor))

export default withAuthorization(ConnectedOpportunity, [UserState.ACCOUNT])

