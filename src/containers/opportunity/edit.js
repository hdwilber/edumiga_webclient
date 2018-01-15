import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Button, Segment, Header } from 'semantic-ui-react'

import SimpleMediaUploader from '../../components/media/image-uploader'

import OppForm from '../../components/opportunity/form-overview'

import { buildImageUrl } from '../../redux/utils'

import * as opportunityActions from '../../redux/opportunity/actions'
import CourseCreate from '../../components/course/create'
import CourseList from '../../components/course/list'
import { Actions as CourseListActions } from '../../components/course/list'

class Edit extends React.Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleClickUploadLogo = this.handleClickUploadLogo.bind(this)

    this.serializeData = this.serializeData.bind(this)

    this.handleCenterChange = this.handleCenterChange.bind(this)
    this.handleLocationFound = this.handleLocationFound.bind(this)

    this.handleOppSelectRow = this.handleOppSelectRow.bind(this)


    this.handleCourseCreateStart = this.handleCourseCreateStart.bind(this)
    this.handleCourseCreateAction = this.handleCourseCreateAction.bind(this)

    this.handleCourseListAction = this.handleCourseListAction.bind(this)
    this.handleCourseListClick = this.handleCourseListClick.bind(this)

    this.state = {
      showCourseCreateForm: false,
      currentCourse: null,
      name: '',
      duration: '',
      description: '',
      regime: '',
      draft: '',
      type: '',
      degree: '',

      logo: {
        file: null,
        url: '',
        fakeUrl: '',
      },
    }
  }

  componentDidMount() {
    const { match, oppFind } = this.props
    const { opportunityId } = match.params

    if (opportunityId) {
      oppFind(opportunityId)
    } 
  }

  componentWillReceiveProps(nextProps) {
    const { opp } = nextProps
    if (opp && opp.current) {
      const i = opp.current
      this.setState({
        name: i.name,
        description: i.description,
        draft: i.draft,
        degree: i.degree,
        duration: i.duration,
        regime: i.regime,
        type: i.type,
        logo: {
          file: null,
          url: i.logo && (buildImageUrl(i.logo.url)),
          fakeUrl: '',
        },
      })
    }
  }

  serializeData() {
    const { opp } = this.props
    return {
      id: opp.current.id,
      name: this.state.name,
      description: this.state.description,
      draft: this.state.draft,
      degree: this.state.degree,
      regime: this.state.regime,
      type: this.state.type,
      duration: this.state.duration,
      location: this.state.location,
      logo: this.state.logo,
    }
  }

  handleSave() {
    const { oppUpdate } = this.props
    oppUpdate({
      ...this.serializeData()
    })
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleCheckboxChange(e, props) {
    console.log(e)
    console.log(props)
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
    console.log(e)
    this.setState({
      location: e.target.getCenter(),
      zoom: e.target.getZoom(),
    })
  }

  handleLocationFound(e) {
    console.log('My location')
    console.log(e)
    if (!this.state.location.lat) {
      this.setState({
        location: e.latlng,
      })
    }
  }

  handleClickUploadLogo() {
    const { opp, oppUploadLogo } = this.props
    console.log(this.state.logo)
    if (opp && opp.current)
      oppUploadLogo(opp.current.id, this.state.logo.file)
  }

  handleOppSelectRow(opp) {
    this.setState({
      opportunity: opp,
      showOpportunityForm: true,
    })
  }

  handleCourseCreateStart() {
    this.setState({
      showCourseCreateForm: true,
      currentCourse: null,
    })
  }

  handleCourseCreateAction(type, data) {
    if (type === 1) {
      const { courseAdd, courseUpdate } = this.props
      console.log(data)
      if (data.id) {
        courseUpdate(data)
      } else {
        courseAdd(data)
      }
    } 
    this.setState({
      showCourseCreateForm: false,
      currentCourse: null,
    })
  }

  handleCourseListClick(course) {
    console.log(course)
    if (course) {
      this.setState({currentCourse: course,
        showCourseCreateForm: true,
      })
    }
  }

  handleCourseListAction(type, course) {
    if (type === CourseListActions.EDIT) {
      this.setState({
        currentCourse: course,
      })
      this.setState({
        showCourseCreateForm: true, 
      })
    } else if (type === CourseListActions.DELETE) {
      const { courseDel } = this.props
      courseDel(course.id)
    }
  }

  render() {
    const { opp } = this.props
    if (opp && opp.current) {
      const data = this.serializeData()
      return (
        <Grid container>
          <Grid.Column width={16}>
            <Header size="huge">Opportunity</Header>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Header size="normal">Logo Profile</Header>
              <SimpleMediaUploader
                name="logo"
                onChange={this.handleInputChange}
                url={data.logo.fakeUrl === '' ? data.logo.url : data.logo.fakeUrl }
                disabled={!data.logo.fakeUrl}
                onUpload={this.handleClickUploadLogo}
              />
            </Segment>
          </Grid.Column>

          <Grid.Column width={10}>
            <Segment>
              <Header size="normal">Overview</Header>
              <OppForm onInputChange={this.handleInputChange}
                onCheckboxChange={this.handleCheckboxChange}
                data={data}
              />
            </Segment>

            <Segment>
              <Header size="normal">Courses<Button default onClick={this.handleCourseCreateStart}>Add</Button></Header>
              <CourseList items={opp.courses} onClickItem={this.handleCourseListClick}
                onClickAction={this.handleCourseListAction}
              />
            </Segment>

            <Button loading={opp.loading} disabled={opp.loading} 
              default
              onClick={this.handleSave}
            >Save</Button>
          </Grid.Column>
          <CourseCreate course={this.state.currentCourse}
            onAction={this.handleCourseCreateAction}
            visible={this.state.showCourseCreateForm}
            courses={opp.courses}
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
  opp: state.opp
}), (dispatch) => ({
  oppUploadLogo: (id, file) => dispatch(opportunityActions.uploadLogo(id, file)),
  oppFind: (id) => dispatch(opportunityActions.findById(id)),
  oppUpdate: (data) => dispatch(opportunityActions.update(data)),
  courseAdd: (data) => dispatch(opportunityActions.courseAdd(data)),
  courseDel: (id) => dispatch(opportunityActions.courseDel(id)),
  courseUpdate: (data) => dispatch(opportunityActions.courseUpdate(data)),
})) (withRouter(Edit))
