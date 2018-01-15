import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

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


const Prerequisites = [
  {
    key: 1,
    id: 'my1',
    text: 'Material requisito1',
    value: 'my1',
  },
  {
    key: 2,
    id: 'my2',
    text: 'Material requisito2',
    value: 'my2',
  },
  {
    key: 3,
    id: 'my3',
    text: 'Material requisito3',
    value: 'my3',
  },
  {
    key: 4,
    id: 'my4',
    text: 'Material requisito4',
    value: 'my4',
  }
]

const FormOverview = (props) => {
  const { onInputChange, prerequisites, data } = props

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
        <Form.Field>
          <label>Units</label>
          <Select value={data.durationUnit} name="durationUnit" 
            onChange={onInputChange} 
            options={DurationUnitsTypes}
          />
        </Form.Field>
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
      <Form.Field>
        <Checkbox label="Is mandatory?" checked={data.mandatory} name="mandatory"
          onChange={handleCheckboxChange}
        />
      </Form.Field>
    </Form>
  )
}

export default FormOverview

