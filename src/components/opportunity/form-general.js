import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

const FormGeneral = (props) => {
  const { constants, onChange, value } = props
  function handleCheckboxChange(e, props) {
    onChange(e, {
      name: props.name,
      value: props.checked,
    })
  }

  const { 
    name, degrees, description, duration, 
    durationUnit,
    type, regime, 
    published,
  } = value
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input width={10} value={name} name="name" onChange={onChange} 
          label="Name" type="text"
        />
        <Form.Field width={6}>
          <label>Degrees</label>
          <Select value={degrees} name="degrees" 
            onChange={onChange} 
            options={constants.degrees || [] }
            multiple
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Description</label>
        <TextArea value={description} name="description" 
          onChange={onChange} 
        />
      </Form.Field>
      <Form.Group>
        <Form.Input value={duration} name="duration" onChange={onChange} 
          label="Duration" type="number"
        />
        <Form.Input value={durationUnit} name="durationUnit" onChange={onChange} 
          label="Units" type="text"
        />
        <Form.Field>
          <label>Type</label>
          <Select value={type} name="type" 
            onChange={onChange} 
            options={constants.attendances || []}
          />
        </Form.Field>
        <Form.Field>
          <label>Regime</label>
          <Select value={regime} name="regime" 
            onChange={onChange} 
            options={constants.regimes || []}
          />
        </Form.Field>
      </Form.Group>
        
      <Form.Field>
        <Checkbox label="Make it visible?" checked={published} name="published"
          onChange={handleCheckboxChange}
        />
      </Form.Field>
    </Form>
  )
}

export default FormGeneral

