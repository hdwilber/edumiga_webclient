import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Grid, Button, Segment, Header } from 'semantic-ui-react'

import SimpleMediaUploader from '../../components/media/image-uploader'

import OppForm from '../../components/opportunity/form-overview'

import * as opportunityActions from '../../redux/opportunity/actions'
import * as courseActions from '../../redux/course/actions'

import CourseCreate from '../../components/course/create'
import CourseList from '../../components/course/list'
import { Actions as CourseListActions } from '../../components/course/list'

import { Opportunity as OppTemplate, format, formatOutput } from '../../types'

class Edit extends React.Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleClickUploadLogo = this.handleClickUploadLogo.bind(this)

    this.handleCenterChange = this.handleCenterChange.bind(this)
    this.handleLocationFound = this.handleLocationFound.bind(this)

    this.handleCourseCreateStart = this.handleCourseCreateStart.bind(this)
    this.handleCourseCreateAction = this.handleCourseCreateAction.bind(this)

    this.handleCourseListAction = this.handleCourseListAction.bind(this)
    this.handleCourseListClick = this.handleCourseListClick.bind(this)

    this.state = {
      ...format(OppTemplate, null),
      showCourseCreateForm: false,
    }
  }

  componentDidMount() {
    const { match, oppFind } = this.props
    const { opportunityId } = match.params

    if (opportunityId) {
      oppFind(opportunityId)
      this.props.oppGetTypes()
    } 
  }

  componentWillReceiveProps(nextProps) {
    const { opp } = nextProps
    if (opp && opp.current) {
      this.setState({
        ...format(OppTemplate, opp.current)
      })
    } 
  }

  handleSave() {
    const { oppUpdate } = this.props
    oppUpdate({
      ...formatOutput(OppTemplate, this.state)
    })
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleCheckboxChange(e, props) {
    if (props.name === 'levels'){
      if (props.checked) {
        this.setState({
          levels: this.state.levels.concat([props.value])
        })
      } else {
        this.setState({
          levels: this.state.levels.filter(v => v !== props.value)
        })
      }
    } else {
      this.setState({
        [props.name]: props.checked,
      })
    }
  }

  handleCenterChange(e) {
    this.setState({
      location: e.target.getCenter(),
      zoom: e.target.getZoom(),
    })
  }

  handleLocationFound(e) {
    if (!this.state.location.lat) {
      this.setState({
        location: e.latlng,
      })
    }
  }

  handleClickUploadLogo() {
    const { opp, oppUploadLogo } = this.props
    if (opp && opp.current)
      oppUploadLogo(opp.current.id, this.state.logo.file)
  }

  handleCourseCreateStart() {
    const { courseSet } = this.props
    courseSet(null)
    this.setState({
      showCourseCreateForm: true,
    })
  }

  handleCourseCreateAction(type, data) {
    const { courseSet, courseCreate } = this.props
    if (type === 1) {
      if (data.id) {
        const { courseUpdate } = this.props
        courseUpdate(data, { inList: true })

      } else {
        delete(data.id)
        courseCreate({
          ...data,
          opportunityId: this.props.opp.current.id,
        }, { inList: true })
      }
    }

    this.setState({
      showCourseCreateForm: false,
    }, () => courseSet(null))
  }

  handleCourseListClick(course) {
    if (course) {
      this.props.courseSet(course.id)
      this.setState({
        showCourseCreateForm: true,
      })
    }
  }

  handleCourseListAction(type, course) {
    if (type === CourseListActions.EDIT) {
      const { courseSet } = this.props
      courseSet(course.id)
      this.setState({
        showCourseCreateForm: true, 
      })
    } else if (type === CourseListActions.DELETE) {
      const { courseDelete } = this.props
      courseDelete(course.id, { inList: true })
    }
  }

  render() {
    const { course, opp } = this.props
    if (opp && course && opp.current && opp.constants) {
      const instOwner = opp.current.institution
      return (
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">Opportunity</Header>
          </Grid.Column>
          <Grid.Column width={6}>
        {(instOwner) && (
            <Segment>
              <Header size="small">Institution: </Header>
              <Button as={Link} to={`/institution/${instOwner.id}/edit`}>{instOwner.name}</Button>
            </Segment>
        )}

            <Segment>
              <Header size="medium">Logo Profile</Header>
              <SimpleMediaUploader
                name="logo"
                onChange={this.handleInputChange}
                url={this.state.logo.fakeUrl === '' ? this.state.logo.url : this.state.logo.fakeUrl }
                disabled={!this.state.logo.fakeUrl}
                onUpload={this.handleClickUploadLogo}
              />
            </Segment>
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>
              <Header size="medium">Overview</Header>
              <OppForm onInputChange={this.handleInputChange}
                onCheckboxChange={this.handleCheckboxChange}
                data={this.state}
                constants={opp.constants}
              />
            </Segment>

            <Segment>
              <Header size="medium">Courses<Button default onClick={this.handleCourseCreateStart}>Add</Button></Header>
              <CourseList items={course.list} onClickItem={this.handleCourseListClick}
                onClickAction={this.handleCourseListAction}
              />
            </Segment>

            <Button loading={opp.loading} disabled={opp.loading} 
              default
              onClick={this.handleSave}
            >Save</Button>
          </Grid.Column>
          <CourseCreate course={course.current}
            onAction={this.handleCourseCreateAction}
            visible={this.state.showCourseCreateForm}
            courses={course.list}
          />
        </Grid>
      )
    } else {
      return <Header size="huge">Loading...</Header>
    }
  }
}

export default connect((state) => ({
  account: state.account,
  institution: state.institution,
  opp: state.opp,
  course: state.course, 
}), (dispatch) => ({
  oppUploadLogo: (id, file) => dispatch(opportunityActions.uploadLogo(id, file)),
  oppFind: (id) => dispatch(opportunityActions.findById(id)),
  oppUpdate: (data) => dispatch(opportunityActions.update(data)),
  oppGetTypes: () => dispatch(opportunityActions.getTypes()),
  courseCreate: (data, opts) => dispatch(courseActions.create(data, opts)),
  courseDelete: (id, opts) => dispatch(courseActions.deletex(id, opts)),
  courseUpdate: (data, opts) => dispatch(courseActions.update(data, opts)),
  courseAddPre: (id, rid, opts) => dispatch(courseActions.addPrerequisite(id, rid, opts)),
  courseSet: (id) => dispatch(courseActions.set(id)),
})) (withRouter(Edit))

