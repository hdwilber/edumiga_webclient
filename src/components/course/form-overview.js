import React from 'react'
import { Select, TextArea, Form } from 'semantic-ui-react'

const DurationUnitsTypes = [
  {
    key: 1,
    text: 'Minutes',
    value: 'minutes',
  },
  {
    key: 2,
    text: 'Hour',
    value: 'hour',
  },
  {
    key: 3,
    text: 'Special',
    value: 'special',
  },
]

const FormOverview = (props) => {
  const { onInputChange, data } = props

  function handleCheckboxChange(e, props) {
    onInputChange(e, {
      name: props.name,
      value: props.checked,
    })
  }
  return (
    <Form>
      <Form.Group>
        <Form.Input value={data.code} name="code" onChange={onInputChange} 
          label="Code" type="text" width={2}
        />
        <Form.Input value={data.name} name="name" onChange={onInputChange} 
          label="Name" type="text"
        />
        <Form.Input value={data.duration} name="duration" onChange={onInputChange} 
          label="Duration" type="text" width={2}
        />
      </Form.Group>

      <Form.Field>
        <label>Description</label>
        <TextArea value={data.description} name="description" 
          onChange={onInputChange} 
        />
      </Form.Field>

      <Form.Field>
        <label>Prerequisites</label>
        <Select multiple value={data.prerequisites || []} name="prerequisites" 
          onChange={onInputChange} 
          options={props.courses}
        />
      </Form.Field>
      <Form.Group>
        <Form.Checkbox label="Is optional?" checked={!data.optional} name="optional"
          onChange={handleCheckboxChange}
        />
        <Form.Checkbox label="Keep it as draft?" checked={data.draft} name="draft"
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    </Form>
  )
}

export default FormOverview

