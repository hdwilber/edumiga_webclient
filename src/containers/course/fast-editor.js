import React from 'react'
import { Grid, Segment, Button, Modal } from 'semantic-ui-react'
import FormGeneral from '../../components/course/form-general'
import { Course, parseData, buildData } from '../../utils/types'
import { Actions } from '../../utils/constants'

export const ActionTypes = {
  SAVE: 1,
  CANCEL: 2,
}
class FastEditor extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ...parseData(Course, props.course),
      isNew: !props.course,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { course } = nextProps
    if (typeof course !== 'undefined') {
      this.setState({
        ...parseData(Course, course),
        isNew: !course,
      })
    }
  }

  handleInputChange = (e, props) => {
    this.setState({
      [props.name]: props.value,
    })
  }

  handleClickSave = () => {
    const { course, courses, onAction } = this.props
    onAction(Actions.save, {
      ref: course,
      course: buildData(Course, this.state, { courses,} ),
      isNew: this.state.isNew,
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

  renderHeader() {
    const { isNew } = this.state
    return (
      <Modal.Header>{ isNew ? 'Enter a new Course': 'Edit Course'}</Modal.Header>
    )
  }
  render() {
    const { prerequisites } = this.state
    const { visible, courses, course, onCancel } = this.props

    const courseList = this.convertCourseList(prerequisites, course, courses)
    return (
      <Modal onClose={onCancel} size="small" open={visible} >
        <Modal.Content>
          <Grid container stackable>
            <Grid.Column width={16}>
              <Segment>
                <FormGeneral
                  onChange={this.handleInputChange}
                  value={this.state}
                  courses={courseList}
                />
                <Button.Group>
                  <Button default onClick={this.handleClickSave} >Save</Button>
                  <Button secondary onClick={onCancel} >Cancel</Button>
                </Button.Group>
              </Segment>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}

export default FastEditor
