import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

class FormOverview extends React.Component {
  constructor(props) {
    super(props)
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleCheckboxChange(e, props) {
    this.props.onInputChange(e, {
      name: props.name,
      value: props.checked,
    })
  }

  render() {
    const { constants, onInputChange, data } = this.props
    if (data && constants) {
      return (
        <Form>
          <Form.Group widths="equal">
            <Form.Input value={data.name} name="name" onChange={onInputChange} 
              label="Name" type="text"
            />
            <Form.Field>
              <label>Degrees</label>
              <Select value={data.degrees} name="degrees" 
                onChange={onInputChange} 
                options={constants.degrees}
                multiple
              />
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <label>Description</label>
            <TextArea value={data.description} name="description" 
              onChange={onInputChange} 
            />
          </Form.Field>
          

          <Form.Group widths="equal">
            <Form.Input value={data.duration} name="duration" onChange={onInputChange} 
              label="Duration" type="number"
            />

            <Form.Field>
              <label>Type</label>
              <Select value={data.type} name="type" 
                onChange={onInputChange} 
                options={constants.attendances}
              />
            </Form.Field>
            
            <Form.Field>
              <label>Regime</label>
              <Select value={data.regime} name="regime" 
                onChange={onInputChange} 
                options={constants.regimes}
              />
            </Form.Field>
          </Form.Group>
            
          <Form.Field>
            <Checkbox key={0} label="Make it visible?" checked={data.published} name="published"
              onChange={this.handleCheckboxChange}
            />
          </Form.Field>
        </Form>
      )
    }
  }
}

export default FormOverview

