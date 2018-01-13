import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

const TypesOptions = [
  {
    key: 1,
    text: 'Public',
    value: 'public',
  },
  {
    key: 2,
    text: 'Private',
    value: 'private',
  },
  {
    key: 3,
    text: 'Mixed',
    value: 'mixed',
  },
  {
    key: 4,
    text: 'Other',
    value: 'other',
  },
]

const LevelsOptions = [
  {
    key: 1,
    text: 'Elementary',
    value: 'elementary',
  },
  {
    key: 2,
    text: 'High School',
    value: 'highschool',
  },
  {
    key: 3,
    text: 'Bachelor',
    value: 'bachelor',
  },
  {
    key: 4,
    text: 'Master of Science',
    value: 'master',
  },
]

const FormOverview = (props) => {
  const { onInputChange, onCheckboxChange, data} = props
  if (data) {
    return (
      <Form>
        <Form.Input value={data.name} name="name" onChange={onInputChange} 
          label="Name" type="text"
        />

        <Form.Input value={data.address} name="address" onChange={onInputChange} label="Address" type="text"/>

        <Form.Field>
          <label>Description</label>
          <TextArea value={data.description} name="description" 
            onChange={onInputChange} 
          />
        </Form.Field>
        
        <Form.Field>
          <label>Type</label>
          <Select value={data.type} name="type" 
            onChange={onInputChange} 
            options={TypesOptions}
          />
        </Form.Field>
        
        <Form.Group grouped>
          <label>Levels</label>
          {LevelsOptions.map (l => {
            return (
              <Form.Field>
                <Checkbox label={l.text} value={l.value} name="levels" onChange={onCheckboxChange} checked={!!data.levels.find(v => v === l.value)}/>
              </Form.Field>
            )
          })}
        </Form.Group>

        <Form.Field>
          <Checkbox label="Keep it as draft?" checked={data.draft} name="draft"
            onChange={onCheckboxChange}
          />
        </Form.Field>
      </Form>
    )
  } else {
    return <h1>Loading...</h1>
  }
}

export default FormOverview

