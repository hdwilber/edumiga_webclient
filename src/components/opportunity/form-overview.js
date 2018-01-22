import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

function formatConstants(constants) {
  const consts = {}
  for(const k in constants) {
    consts[k] = constants[k].map((v, idx) => {
      return {
        key: idx,
        text: v.name,
        value: v.id,
      }
    })
  }
  return consts
}

class FormOverview extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputFileChange = this.handleInputFileChange.bind(this)
  }

  handleInputFileChange(e, props) {
    this.setState({
      logo: {
        src: URL.createObjectURL(e.target.files[0]),
        files: e.target.files,
      }
    })
  }

  render() {
    const { constants, onInputChange, onCheckboxChange, data } = this.props
    if (data && constants) {
      const newConst = formatConstants(constants)
      console.log(newConst)
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
                options={newConst.degrees}
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
                options={newConst.attendances}
              />
            </Form.Field>
            
            <Form.Field>
              <label>Regime</label>
              <Select value={data.regime} name="regime" 
                onChange={onInputChange} 
                options={newConst.regimes}
              />
            </Form.Field>
          </Form.Group>
            
          <Form.Field>
            <Checkbox key={0} label="Keep it as draft?" checked={data.draft} name="draft"
              onChange={onCheckboxChange}
            />
          </Form.Field>
        </Form>
      )
    }
  }
}

export default FormOverview

