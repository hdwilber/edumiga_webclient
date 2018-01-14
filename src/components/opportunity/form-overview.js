import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

const RegimesTypes = [
  {
    key: 1,
    text: 'Yearly',
    value: 'yearly',
  },
  {
    key: 2,
    text: 'Monthly',
    value: 'monthly',
  },
  {
    key: 3,
    text: 'Bimonthly',
    value: 'bimonthly',
  },
  {
    key: 4,
    text: 'Quarterly',
    value: 'quarterly',
  },
  {
    key: 5,
    text: 'Triannual',
    value: 'triannual',
  },
  {
    key: 6,
    text: 'Semiannual',
    value: 'semiannual',
  },
  {
    key: 7,
    text: 'Mixed',
    value: 'mixed',
  },
]

const DegreesTypes = [
  {
    key: 1,
    text: 'Technician',
    value: 'tech',
  },
  {
    key: 2,
    text: 'Bachelor',
    value: 'bachelor',
  },
  {
    key: 3,
    text: 'Master',
    value: 'master',
  },
  {
    key: 4,
    text: 'Doctor',
    value: 'doctor',
  },
  {
    key: 5,
    text: 'PostDoctor',
    value: 'postdoc',
  },
  {
    key: 6,
    text: 'Specialization',
    value: 'special',
  },
]

const Types = [
  {
    key: 1,
    text: 'Remote',
    value: 'remote',
  },
  {
    key: 2,
    text: 'Mixed',
    value: 'mixed',
  },
  {
    key: 3,
    text: 'Presential',
    value: 'presential'
  }
]

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
    const { onInputChange, onCheckboxChange, data } = this.props
    return (
      <Form>
        <Form.Input value={data.name} name="name" onChange={onInputChange} 
          label="Name" type="text"
        />
        <Form.Field>
          <label>Description</label>
          <TextArea value={data.description} name="description" 
            onChange={onInputChange} 
          />
        </Form.Field>
        
        <Form.Field>
          <label>Degree</label>
          <Select value={data.degree} name="degree" 
            onChange={onInputChange} 
            options={DegreesTypes}
          />
        </Form.Field>

        <Form.Input value={data.duration} name="duration" onChange={onInputChange} 
          label="Duration" type="number"
        />

        <Form.Field>
          <label>Type</label>
          <Select value={data.type} name="type" 
            onChange={onInputChange} 
            options={Types}
          />
        </Form.Field>
        
        <Form.Field>
          <label>Regime</label>
          <Select value={data.regime} name="regime" 
            onChange={onInputChange} 
            options={RegimesTypes}
          />
        </Form.Field>
        

        <Form.Field>
          <Checkbox label="Keep it as draft?" checked={data.draft} name="draft"
            onChange={onCheckboxChange}
          />
        </Form.Field>
      </Form>
    )
  }
}

export default FormOverview

