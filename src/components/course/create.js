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
      const { id, code, name, description, duration, durationUnit, mandatory, prerequisites } = props.course

      this.state = {
        id, code, name, description, duration, durationUnit, mandatory, prerequisites: prerequisites || [],
      }
    } else {
      this.state = {
        id: null, code: '', name:'', description:'', duration:0, durationUnit:'', 
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
    const { id, code, name, description, duration, durationUnit, mandatory, prerequisites } = this.state
    onAction(ActionTypes.SAVE, {
      id, name, code, description, duration, durationUnit, mandatory,
    })
  }

  handleClickCancel() {
    const { onAction } = this.props
    onAction(ActionTypes.CANCEL, null)
  }

  serializeData() {
    const { course } = this.props
    const { id, code, name, description, duration, durationUnit, mandatory, prerequisites } = this.state

    return {
      id,
      name, code, description, duration, durationUnit, mandatory, prerequisites,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course) {
      const { id, code, name, description, duration, durationUnit, mandatory } = nextProps.course
      this.setState({
        id, code, name, description, duration, durationUnit, mandatory, prerequisites: [],
      })
    } else if (nextProps.course === null)  {
      this.setState({
        id: null, code: '', name:'', description:'', duration:0, durationUnit:'', 
        mandatory: false, prerequisites: [],
      })
    } 
  }

  handleInputChange(e, props) {
    this.setState({
      [props.name]: props.value,
    })
  }

  convertCourseList(courses) {
    return courses.map((c,idx) => {
      return {
        value: c.id,
        text: c.name,
        key: idx,
      }
    })
  }

  render() {
    const { onLogoUpload, onCancel, visible, courses } = this.props
    const data = this.serializeData()
    const courseList =this.convertCourseList(courses)
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
  }
}

export default CourseCreate
