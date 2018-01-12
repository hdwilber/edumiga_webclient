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

class InstForm extends React.Component {

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
    const { onInputChange, onCheckboxChange, levels, type, name, description, draft  } = this.props
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
          <label>Type</label>
          <Select value={type} name="type" 
            onChange={onInputChange} 
            options={TypesOptions}
          />
        </Form.Field>
        
        <Form.Group grouped>
          <label>Levels</label>
          {LevelsOptions.map (l => {
            return (
              <Form.Field>
                <Checkbox label={l.text} value={l.value} name="levels" onChange={onCheckboxChange} checked={!!levels.find(v => v === l.value)}/>
              </Form.Field>
            )
          })}
        </Form.Group>

        <Form.Field>
          <Checkbox label="Keep it as draft?" checked={draft} name="draft"
            onChange={onCheckboxChange}
          />
        </Form.Field>
      </Form>
    )
  }
}

export default InstForm

