import React from 'react'
import { Select, Checkbox, TextArea, Form } from 'semantic-ui-react'

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
class SimpleForm extends React.Component {

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
    const { onInputChange, onCheckboxChange, levels, degree, type, name, description, draft  } = this.props
    return (
      <Form>
        <Form.Input value={name} name="name" onChange={onInputChange} 
          label="Name" type="text"
        />
        <Form.Field>
          <label>Description</label>
          <TextArea value={description} name="description" 
            onChange={onInputChange} 
            label="Password" type="password"
          />
        </Form.Field>
        
        <Form.Field>
          <label>Degree</label>
          <Select value={degree} name="degree" 
            onChange={onInputChange} 
            options={DegreesTypes}
          />
        </Form.Field>
        
        <Form.Field>
          <label>Type</label>
          <Select value={type} name="type" 
            onChange={onInputChange} 
            options={Types}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox label="Keep it as draft?" checked={draft} name="draft"
            onChange={onCheckboxChange}
          />
        </Form.Field>
      </Form>
    )
  }
}

export default SimpleForm

