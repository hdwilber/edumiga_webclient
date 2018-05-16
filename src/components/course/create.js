import React from 'react'
import { Grid, Segment, Button, Modal } from 'semantic-ui-react'
import FormOverview from './form-overview'
import { Course as CourseTemplate, format, formatOutput, } from '../../types'

export const ActionTypes = {
  SAVE: 1,
  CANCEL: 2,
}
class CourseCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...format(CourseTemplate, props.course),
    }

    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleClickSave() {
    const { onAction } = this.props
    onAction(ActionTypes.SAVE, formatOutput(CourseTemplate, this.state))
  }

  handleClickCancel() {
    const { onAction } = this.props
    onAction(ActionTypes.CANCEL, null)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.course) {
      this.setState({
        ...format(CourseTemplate, nextProps.course),
      })
    } else if (nextProps.course === null)  {
      this.setState({
        ...format(CourseTemplate, null),
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
        disabled: course ? course.id === c.id: false,
        active: (pre.indexOf(c.id) > -1),
      }
    })
  }

  render() {
    const { visible, courses, course } = this.props
    if (courses) {
      const courseList =this.convertCourseList(this.state.prerequisites, course, courses)
      return (
        <Modal closeOnDocumentClick onClose={this.handleClickCancel} size="small" open={visible} >
          <Modal.Header>Enter a new Course</Modal.Header>
          <Modal.Content>
            <Grid container stackable>
              <Grid.Column width={16}>
                <Segment>
                  <FormOverview onInputChange={this.handleInputChange}
                    data={this.state}
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
