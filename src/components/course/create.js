import React from 'react'
import { Grid, Segment, Header, Button, Modal } from 'semantic-ui-react'
import SimpleMediaUploader from '../../components/media/image-uploader'
import FormOverview from './form-overview'

import { buildImageUrl } from '../../redux/utils'

export const ActionTypes = {
  SAVE: 1,
  CANCEL: 2,
}
class CourseCreate extends React.Component {
  constructor(props) {
    super(props)
    if (props.course) {
      const { id, code, name, draft, description, duration, durationUnit, mandatory, prerequisites } = props.course

      this.state = {
        id, code, name, description, draft, duration, durationUnit, mandatory, prerequisites: prerequisites || [],
      }
    } else {
      this.state = {
        id: null, code: '', draft: '', name:'', description:'', duration:0, durationUnit:'', 
        mandatory: false, prerequisites: [],
      } 
    } 

    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.serializeData = this.serializeData.bind(this)
  }

  handleClickSave() {
    const { onAction } = this.props
    const { id, code, draft, name, description, duration, durationUnit, mandatory, prerequisites } = this.state
    onAction(ActionTypes.SAVE, {
      id, name, code, draft, prerequisites, description, duration, durationUnit, mandatory,
    })
  }

  handleClickCancel() {
    const { onAction } = this.props
    onAction(ActionTypes.CANCEL, null)
  }

  serializeData() {
    const { course } = this.props
    const { id, code, draft, name, description, duration, durationUnit, mandatory, prerequisites } = this.state

    return {
      id,
      name, code, draft, description, duration, durationUnit, mandatory, prerequisites,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course) {
      const { id, code, draft, name, description, 
        duration, durationUnit, mandatory, prerequisites } = nextProps.course
      this.setState({
        id, code, name, draft, description, duration, durationUnit, mandatory, prerequisites: prerequisites ? prerequisites.map(p => p.id) : [],
      }, () => console.log(this.state))
    } else if (nextProps.course === null)  {
      this.setState({
        id: null, code: '', draft: '', name:'', description:'', duration:0, durationUnit:'', 
        mandatory: false, prerequisites: [],
      })
    } 
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  convertCourseList(pre, course, courses) {
    return courses.map((c,idx) => {
      return {
        value: c.id,
        text: c.name,
        key: idx,
        disabled: course.id === c.id,
        active: (pre.indexOf(c.id) > -1),
      }
    })
  }

  render() {
    const { onLogoUpload, onCancel, visible, courses, course } = this.props
    if (course) {
      const data = this.serializeData()
      const courseList =this.convertCourseList(this.state.prerequisites, course, courses)
      return (
        <Modal size="small" open={visible} >
          <Modal.Header>Enter a new Course</Modal.Header>
          <Modal.Content image>
            <Grid container>
              <Grid.Column width={16}>
                <Segment>
                  <FormOverview onInputChange={this.handleInputChange}
                    data={data}
                    courses={courseList}
                  />
                  <Button.Group>
                    <Button default onClick={this.handleClickSave} >Save</Button>
                    <Button secondary onClick={this.handleClickCancel} >Cancel</Button>
                  </Button.Group>
                </Segment>
              </Grid.Column>
            </Grid>
          </Modal.Content>
        </Modal>
      )
    } else {
      return null
    } 
  }
}

export default CourseCreate
