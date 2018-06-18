import React from 'react'
import { Select, TextArea, Form } from 'semantic-ui-react'

const FormGeneral = (props) => {
  const { constants, onChange, value } = props

  function handleCheckboxChange(e, props) {
    onChange(e, {
      name: props.name,
      value: props.checked,
    })
  }
  function convertCourseList(pre, course, courses) {
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

  const { id, code, name, duration, level, 
    description, prerequisites, optional, draft, 
  } = value
  const courses = convertCourseList(prerequisites, {id, }, constants.courses)
  return (
    <Form>
      <Form.Group>
        <Form.Input value={code} name="code" onChange={onChange} 
          label="Code" type="text" width={3}
        />
        <Form.Input value={name} name="name" onChange={onChange} 
          label="Name" type="text"
        />
        <Form.Input value={duration} name="duration" onChange={onChange} 
          label="Duration" type="text" width={2}
        />
        <Form.Input value={level} name="level" onChange={onChange} 
          label="Level" type="text" width={2}
        />
      </Form.Group>

      <Form.Field>
        <label>Description</label>
        <TextArea value={description} name="description" 
          onChange={onChange} 
        />
      </Form.Field>

      <Form.Field>
        <label>Prerequisites</label>
        <Select multiple value={prerequisites || []} name="prerequisites" 
          onChange={onChange} 
          options={courses}
        />
      </Form.Field>
      <Form.Group>
        <Form.Checkbox label="Is optional?" checked={!optional} name="optional"
          onChange={handleCheckboxChange}
        />
        <Form.Checkbox label="Keep it as draft?" checked={draft} name="draft"
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    </Form>
  )
}

export default FormGeneral

